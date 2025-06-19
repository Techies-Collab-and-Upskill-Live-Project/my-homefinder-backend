
const mockPrisma = {
  user: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn()
  },
  role: {
    findUnique: jest.fn(),
    create: jest.fn()
  }
};

jest.mock('../../../generated/prisma', () => {
  return {
    PrismaClient: jest.fn(() => mockPrisma)
  };
});

jest.mock('../../../utils/hash.util', () => ({
  comparePassword: jest.fn(),
  hashPassword: jest.fn().mockResolvedValue('hashedPassword')
}));

jest.mock('../../../utils/jwt.util', () => ({
  generateToken: jest.fn(() => ({
    token: 'mockToken',
    expiresIn: 86400
  }))
}));

import { AuthService } from '../../../services/auth.service';
import HTTPException from '../../../exceptions/http.exception';
import { comparePassword, hashPassword } from '../../../utils/hash.util';
import { generateToken } from '../../../utils/jwt.util';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  const fakeUser = {
    id: '123',
    email: 'test@example.com',
    phone: '08012345678',
    password: 'hashedPassword',
    role: { id: 1, name: 'renter' }
  };

  describe('signup()', () => {
    it('should throw if userData is empty', async () => {
      await expect(authService.signup({} as any)).rejects.toThrow(HTTPException);
    });

    it('should throw if passwords do not match', async () => {
      await expect(
        authService.signup({
          fullName: 'John Doe',
          email: 'test@example.com',
          phone: '08012345678',
          password: 'pass1',
          passwordRepeat: 'pass2',
          role: 'renter'
        })
      ).rejects.toThrow(/passwords don't match/i);
    });

    it('should throw if user already exists', async () => {
      mockPrisma.user.findFirst.mockResolvedValue(fakeUser);
      await expect(
        authService.signup({
          fullName: 'John Doe',
          email: 'test@example.com',
          phone: '08012345678',
          password: 'pass',
          passwordRepeat: 'pass',
          role: 'renter'
        })
      ).rejects.toThrow(/already registered/i);
    });

    it('should create a new user if data is valid', async () => {
      mockPrisma.user.findFirst.mockResolvedValue(null);
      mockPrisma.role.findUnique.mockResolvedValue({ id: 1, name: 'renter' });
      mockPrisma.user.create.mockResolvedValue(fakeUser);

      const result = await authService.signup({
        fullName: 'John Doe',
        email: 'test@example.com',
        phone: '08012345678',
        password: 'pass',
        passwordRepeat: 'pass',
        role: 'renter'
      });

      expect(result).toHaveProperty('email', 'test@example.com');
      expect(mockPrisma.user.create).toHaveBeenCalled();
    });
  });

  describe('login()', () => {
    it('should throw if loginData is empty', async () => {
      await expect(authService.login({} as any)).rejects.toThrow(HTTPException);
    });

    it('should throw if user not found', async () => {
      mockPrisma.user.findFirst.mockResolvedValue(null);
      await expect(
        authService.login({ emailOrPhone: 'missing', password: 'test' })
      ).rejects.toThrow(/not found/i);
    });

    it('should throw if password mismatch', async () => {
      mockPrisma.user.findFirst.mockResolvedValue(fakeUser);
      (comparePassword as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login({ emailOrPhone: fakeUser.email, password: 'wrong' })
      ).rejects.toThrow(/invalid credentials/i);
    });

    it('should return token and cookie if login is valid', async () => {
      mockPrisma.user.findFirst.mockResolvedValue(fakeUser);
      (comparePassword as jest.Mock).mockResolvedValue(true);

      const result = await authService.login({
        emailOrPhone: fakeUser.email,
        password: 'correct'
      });

      expect(generateToken).toHaveBeenCalled();
      expect(result.token.token).toBe('mockToken');
      expect(result.cookie).toContain('Authorization=mockToken');
      expect(result.user).toHaveProperty('email', fakeUser.email);
    });
  });
});