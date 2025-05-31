import { PasswordResetService } from '../../../services/password-reset.service';
import { prisma } from '../../../prisma/prisma';
import { EmailService } from '../../../services/email.service';
import * as hashUtil from '../../../utils/hash.util';
import { testUsers, testTokens, generateHashedOTP } from '../../fixtures';

// Mock dependencies
jest.mock('../../../services/email.service');
jest.mock('../../../utils/hash.util', () => ({
  hashPassword: jest.fn(),
  comparePassword: jest.fn(),
}));
jest.mock('../../../prisma/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    passwordResetToken: {
      updateMany: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});
const mockedEmailService = EmailService as jest.MockedClass<typeof EmailService>;

describe('PasswordResetService', () => {
  let passwordResetService: PasswordResetService;
  let mockEmailService: jest.Mocked<EmailService>;

  beforeEach(() => {
    mockEmailService = {
      sendPasswordResetEmail: jest.fn(),
      verifyConnection: jest.fn(),
    } as any;
    
    mockedEmailService.mockImplementation(() => mockEmailService);
    passwordResetService = new PasswordResetService();
  });

  describe('initiateForgotPassword', () => {
    it('should send password reset email for existing user', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(testUsers.validUser);
      (prisma.passwordResetToken.updateMany as jest.Mock).mockResolvedValue({ count: 0 });
      (prisma.passwordResetToken.create as jest.Mock).mockResolvedValue(testTokens.validToken);
      (hashUtil.hashPassword as jest.Mock).mockResolvedValue('hashedOTP123');
      mockEmailService.sendPasswordResetEmail.mockResolvedValue();

      const result = await passwordResetService.initiateForgotPassword('test@example.com');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Password reset code sent to your email address.');
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(mockEmailService.sendPasswordResetEmail).toHaveBeenCalled();
    });

    it('should return success message for non-existent user (email enumeration protection)', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await passwordResetService.initiateForgotPassword('nonexistent@example.com');

      expect(result.success).toBe(true);
      expect(result.message).toBe('If an account with this email exists, you will receive a password reset code.');
      expect(mockEmailService.sendPasswordResetEmail).not.toHaveBeenCalled();
    });

    it('should invalidate existing unused tokens', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(testUsers.validUser);
      (prisma.passwordResetToken.updateMany as jest.Mock).mockResolvedValue({ count: 1 });
      (prisma.passwordResetToken.create as jest.Mock).mockResolvedValue(testTokens.validToken);
      (hashUtil.hashPassword as jest.Mock).mockResolvedValue('hashedOTP123');
      mockEmailService.sendPasswordResetEmail.mockResolvedValue();

      await passwordResetService.initiateForgotPassword('test@example.com');

      expect(prisma.passwordResetToken.updateMany).toHaveBeenCalledWith({
        where: {
          userId: testUsers.validUser.id,
          used: false,
          expiresAt: { gt: expect.any(Date) },
        },
        data: { used: true },
      });
    });

    it('should throw error when email service fails', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(testUsers.validUser);
      (prisma.passwordResetToken.updateMany as jest.Mock).mockResolvedValue({ count: 0 });
      (prisma.passwordResetToken.create as jest.Mock).mockResolvedValue(testTokens.validToken);
      (hashUtil.hashPassword as jest.Mock).mockResolvedValue('hashedOTP123');
      mockEmailService.sendPasswordResetEmail.mockRejectedValue(new Error('Email failed'));

      await expect(
        passwordResetService.initiateForgotPassword('test@example.com')
      ).rejects.toThrow('Failed to process password reset request');
    });
  });

  describe('resetPassword', () => {
    it('should reset password with valid token', async () => {
      const plainOTP = '123456';
      const hashedOTP = await generateHashedOTP(plainOTP);
      const tokenWithUser = { ...testTokens.validToken, user: testUsers.validUser };

      (prisma.passwordResetToken.findMany as jest.Mock).mockResolvedValue([tokenWithUser]);
      (hashUtil.comparePassword as jest.Mock).mockResolvedValue(true);
      (hashUtil.hashPassword as jest.Mock).mockResolvedValue('newHashedPassword');
      (prisma.$transaction as jest.Mock).mockResolvedValue([]);

      const result = await passwordResetService.resetPassword(plainOTP, 'NewPassword123!');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Password reset successfully.');
      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it('should fail with invalid token', async () => {
      (prisma.passwordResetToken.findMany as jest.Mock).mockResolvedValue([]);

      const result = await passwordResetService.resetPassword('999999', 'NewPassword123!');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid or expired reset code.');
    });

    it('should fail with expired token', async () => {
      const tokenWithUser = { ...testTokens.expiredToken, user: testUsers.validUser };
      (prisma.passwordResetToken.findMany as jest.Mock).mockResolvedValue([]);

      const result = await passwordResetService.resetPassword('123456', 'NewPassword123!');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid or expired reset code.');
    });

    it('should throw error when database transaction fails', async () => {
      const plainOTP = '123456';
      const tokenWithUser = { ...testTokens.validToken, user: testUsers.validUser };

      (prisma.passwordResetToken.findMany as jest.Mock).mockResolvedValue([tokenWithUser]);
      (hashUtil.comparePassword as jest.Mock).mockResolvedValue(true);
      (hashUtil.hashPassword as jest.Mock).mockResolvedValue('newHashedPassword');
      (prisma.$transaction as jest.Mock).mockRejectedValue(new Error('Database error'));

      await expect(
        passwordResetService.resetPassword(plainOTP, 'NewPassword123!')
      ).rejects.toThrow('Failed to reset password');
    });
  });

  describe('cleanupExpiredTokens', () => {
    it('should delete expired and used tokens', async () => {
      (prisma.passwordResetToken.deleteMany as jest.Mock).mockResolvedValue({ count: 5 });

      await passwordResetService.cleanupExpiredTokens();

      expect(prisma.passwordResetToken.deleteMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { expiresAt: { lt: expect.any(Date) } },
            { used: true },
          ],
        },
      });
    });
  });
});