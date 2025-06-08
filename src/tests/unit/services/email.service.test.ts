import { config } from '../../../config';
import { EmailService } from '../../../services/email.service';
import nodemailer from 'nodemailer';

// Mock nodemailer
jest.mock('nodemailer');
const mockedNodemailer = nodemailer as jest.Mocked<typeof nodemailer>;

describe('EmailService', () => {
  let emailService: EmailService;
  let mockTransporter: any;

  beforeEach(() => {
    mockTransporter = {
      sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
      verify: jest.fn().mockResolvedValue(true),
    };
    
    mockedNodemailer.createTransport.mockReturnValue(mockTransporter);
    emailService = new EmailService();
  });

  describe('sendPasswordResetEmail', () => {
    it('should send password reset email successfully', async () => {
      const email = 'test@example.com';
      const otp = '123456';

      await emailService.sendPasswordResetEmail(email, otp);

      expect(mockTransporter.sendMail).toHaveBeenCalledWith({
        from: config.email.from,
        to: email,
        subject: expect.stringContaining('Password Reset'),
        html: expect.stringContaining(otp),
        text: expect.stringContaining(otp),
      });
    });

    it('should throw error when email sending fails', async () => {
      mockTransporter.sendMail.mockRejectedValue(new Error('SMTP Error'));

      await expect(
        emailService.sendPasswordResetEmail('test@example.com', '123456')
      ).rejects.toThrow('Failed to send password reset email');
    });
  });

  describe('verifyConnection', () => {
    it('should return true for successful connection', async () => {
      mockTransporter.verify.mockResolvedValue(true);

      const result = await emailService.verifyConnection();
      expect(result).toBe(true);
    });

    it('should return false for failed connection', async () => {
      mockTransporter.verify.mockRejectedValue(new Error('Connection failed'));

      const result = await emailService.verifyConnection();
      expect(result).toBe(false);
    });
  });
});