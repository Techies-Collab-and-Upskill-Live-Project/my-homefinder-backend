// src/tests/unit/services/auth.service.test.ts

import { StatusCodes } from 'http-status-codes';
import HTTPException from '../../../exceptions/http.exception';
import { AuthService } from '../../../services/auth.service';
import { comparePassword, hashPassword } from '../../../utils/hash.util';
import { generateToken } from '../../../utils/jwt.util';
import { OTPGenerator } from '../../../utils/otp-generator.util'; // Import OTPGenerator
import { EmailService } from '../../../services/email.service'; // Import EmailService
import { config } from '../../../config'; // Import config to mock otp expiry


// Mock the PrismaClient module and define mockPrisma within its factory function
jest.mock('../../../prisma/prisma', () => {
  // Define mockPrisma directly inside the mock factory to ensure it's initialized
  // before the 'prisma' export is accessed.
  const mockPrisma = {
    user: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(), // Added for verifyEmail
    },
    role: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    emailVerificationToken: { // Added for email verification
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(), // Added for signup to invalidate old tokens
    },
    tenantProfile: { // Added for profile creation
      create: jest.fn(),
    },
    landLordProfile: { // Added for profile creation
      create: jest.fn(),
    },
    // CORRECTED: Mock $transaction to handle an array of promises, not a callback function.
    // This aligns with how AuthService uses prisma.$transaction.
    $transaction: jest.fn((promises: Promise<any>[]) => Promise.all(promises)),
  };
  return {
    prisma: mockPrisma, // Export the mockPrisma directly
  };
});

// Mock hash and compare utilities
jest.mock('../../../utils/hash.util', () => ({
  comparePassword: jest.fn(),
  hashPassword: jest.fn().mockResolvedValue('hashedPassword'),
}));

// Mock JWT utilities
jest.mock('../../../utils/jwt.util', () => ({
  generateToken: jest.fn(() => ({
    token: 'mockToken',
    expiresIn: 86400,
  })),
}));

// Mock OTPGenerator
jest.mock('../../../utils/otp-generator.util', () => ({
  OTPGenerator: {
    generateNumeric: jest.fn().mockReturnValue('123456'), // Mock OTP generation
    generateExpiryDate: jest.fn().mockReturnValue(new Date(Date.now() + 60 * 1000)), // Mock expiry
  },
}));

// Mock EmailService
// This mock is already good, as it mocks the constructor and its method
jest.mock('../../../services/email.service', () => ({
  EmailService: jest.fn().mockImplementation(() => ({
    sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
  })),
}));


// Mock config for OTP expiry (if used in AuthService directly)
jest.mock('../../../config', () => ({
  config: {
    otp: {
      expiryMinutes: 10, // Example value
    },
  },
}));


describe('AuthService', () => {
  let authService: AuthService;

  // Define a fake user object for consistent testing
  const fakeUser = {
    id: 'user-123',
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '08012345678',
    password: 'hashedPassword',
    isVerified: false,
    role: { id: 1, name: 'RENTER' }, // Ensure role name matches uppercase in service
  };

  // Define a fake verified user for login tests
  const fakeVerifiedUser = {
    ...fakeUser,
    isVerified: true,
  };

  // Define a fake OTP token record
  const fakeOtpToken = {
    id: 'token-123',
    token: 'hashedOTP', // This will be the hashed version of the OTP
    userId: fakeUser.id,
    expiresAt: new Date(Date.now() + 60 * 1000), // 1 minute from now
    used: false,
  };

  beforeEach(() => {
    // Initialize AuthService before each test
    authService = new AuthService();
    // Clear all mock calls and reset mock implementations
    jest.clearAllMocks();
    // Reset default mock behaviors for common scenarios
    // Access mockPrisma through the mocked prisma module
    const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
    mockPrismaInstance.user.findFirst.mockResolvedValue(null);
    mockPrismaInstance.user.findUnique.mockResolvedValue(null);
    mockPrismaInstance.role.findUnique.mockResolvedValue({ id: 1, name: 'RENTER' }); // Default role
    (hashPassword as jest.Mock).mockResolvedValue('hashedPassword'); // Default hashed password
    (comparePassword as jest.Mock).mockResolvedValue(true); // Default password comparison

    // Reset the mock implementation for EmailService in each test to ensure a fresh mock instance
    // This is crucial to avoid issues with jest.clearAllMocks() and .mock.instances
    (EmailService as jest.Mock).mockClear(); // Clear calls on the constructor
    (EmailService as jest.Mock).mockImplementation(() => ({
        sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
    }));
  });

  describe('signup()', () => {
    it('should throw HTTPException if userData is empty', async () => {
      await expect(authService.signup({} as any)).rejects.toThrow(HTTPException);
      await expect(authService.signup({} as any)).rejects.toHaveProperty('status', StatusCodes.BAD_REQUEST);
    });

    it('should throw HTTPException if role is invalid or missing', async () => {
      await expect(
        authService.signup({
          fullName: 'John Doe',
          email: 'test@example.com',
          phone: '08012345678',
          password: 'pass',
          passwordRepeat: 'pass',
          role: 'invalidRole' as any,
        })
      ).rejects.toThrow(HTTPException);
      await expect(
        authService.signup({
          fullName: 'John Doe',
          email: 'test@example.com',
          phone: '08012345678',
          password: 'pass',
          passwordRepeat: 'pass',
          role: 'invalidRole' as any,
        })
      ).rejects.toHaveProperty('status', StatusCodes.BAD_REQUEST);
    });

    it('should throw HTTPException if user already exists (email or phone)', async () => {
      const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
      mockPrismaInstance.user.findFirst.mockResolvedValue(fakeUser); // Simulate existing user
      await expect(
        authService.signup({
          fullName: 'John Doe',
          email: fakeUser.email,
          phone: fakeUser.phone,
          password: 'pass',
          passwordRepeat: 'pass',
          role: 'renter',
        })
      ).rejects.toThrow(HTTPException);
      await expect(
        authService.signup({
          fullName: 'John Doe',
          email: fakeUser.email,
          phone: fakeUser.phone,
          password: 'pass',
          passwordRepeat: 'pass',
          role: 'renter',
        })
      ).rejects.toHaveProperty('status', StatusCodes.BAD_REQUEST);
      expect(mockPrismaInstance.user.findFirst).toHaveBeenCalledWith({
        where: { OR: [{ email: fakeUser.email }, { phone: fakeUser.phone }] },
      });
    });

    it('should throw HTTPException if passwords do not match', async () => {
      await expect(
        authService.signup({
          fullName: 'John Doe',
          email: 'test@example.com',
          phone: '08012345678',
          password: 'pass1',
          passwordRepeat: 'pass2',
          role: 'renter',
        })
      ).rejects.toThrow(HTTPException);
      await expect(
        authService.signup({
          fullName: 'John Doe',
          email: 'test@example.com',
          phone: '08012345678',
          password: 'pass1',
          passwordRepeat: 'pass2',
          role: 'renter',
        })
      ).rejects.toHaveProperty('status', StatusCodes.BAD_REQUEST);
      await expect(
        authService.signup({
          fullName: 'John Doe',
          email: 'test@example.com',
          phone: '08012345678',
          password: 'pass1',
          passwordRepeat: 'pass2',
          role: 'renter',
        })
      ).rejects.toThrow(/passwords don't match/i);
    });

    // it('should successfully create a new user and send verification email for renter', async () => {
    //   const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
    //   mockPrismaInstance.user.create.mockResolvedValue(fakeUser);
    //   mockPrismaInstance.role.findUnique.mockResolvedValue({ id: 1, name: 'RENTER' }); // Ensure role matches
    //   mockPrismaInstance.emailVerificationToken.updateMany.mockResolvedValue({ count: 0 }); // No existing tokens
    //   mockPrismaInstance.emailVerificationToken.create.mockResolvedValue(fakeOtpToken); // OTP token created
    //   mockPrismaInstance.tenantProfile.create.mockResolvedValue({}); // Tenant profile created

    //   const result = await authService.signup({
    //     fullName: fakeUser.fullName,
    //     email: fakeUser.email,
    //     phone: fakeUser.phone,
    //     password: 'validPassword',
    //     passwordRepeat: 'validPassword',
    //     role: 'renter',
    //   });

    //   expect(mockPrismaInstance.user.findFirst).toHaveBeenCalledWith({
    //     where: { OR: [{ email: fakeUser.email }, { phone: fakeUser.phone }] },
    //   });
    //   expect(mockPrismaInstance.role.findUnique).toHaveBeenCalledWith({ where: { name: 'RENTER' } });
    //   expect(hashPassword).toHaveBeenCalledWith('validPassword');
    //   expect(mockPrismaInstance.user.create).toHaveBeenCalledWith({
    //     data: {
    //       fullName: fakeUser.fullName,
    //       email: fakeUser.email,
    //       phone: fakeUser.phone,
    //       password: 'hashedPassword',
    //       isVerified: false,
    //       role: { connect: { id: 1 } },
    //     },
    //     include: {
    //       role: true,
    //       tenantProfile: false,
    //       landlordProfile: false,
    //     }
    //   });
    //   expect(mockPrismaInstance.emailVerificationToken.updateMany).toHaveBeenCalledWith({
    //     where: {
    //       userId: fakeUser.id,
    //       used: false,
    //       expiresAt: { gt: expect.any(Date) },
    //     },
    //     data: { used: true },
    //   });
    //   expect(OTPGenerator.generateNumeric).toHaveBeenCalledWith(6);
    //   expect(OTPGenerator.generateExpiryDate).toHaveBeenCalledWith(config.otp.expiryMinutes);
    //   expect(mockPrismaInstance.emailVerificationToken.create).toHaveBeenCalledWith({
    //     data: {
    //       token: 'hashedPassword', // Mocked hashed OTP
    //       userId: fakeUser.id,
    //       expiresAt: expect.any(Date),
    //       used: false,
    //     },
    //   });
    //   expect(EmailService).toHaveBeenCalled(); // Check if EmailService was instantiated
    //   // Ensure we get the *current* mock instance's method
    //   const emailServiceInstance = (EmailService as jest.Mock).mock.instances[0];
    //   expect(emailServiceInstance.sendVerificationEmail).toHaveBeenCalledWith(fakeUser.email, '123456');
    //   expect(mockPrismaInstance.tenantProfile.create).toHaveBeenCalledWith({
    //     data: {
    //       profileImage: "",
    //       fullName: fakeUser.fullName,
    //       firstName: "",
    //       lastName: "",
    //       otherName: "",
    //       phoneNumber: fakeUser.phone,
    //       street: "",
    //       city: "",
    //       state: "",
    //       NIN: "",
    //       userId: fakeUser.id
    //     }
    //   });
    //   expect(mockPrismaInstance.landLordProfile.create).not.toHaveBeenCalled();
    //   expect(result).toEqual(fakeUser);
    // });

    it('should successfully create a new user and send verification email for landlord', async () => {
      const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
      const fakeLandlordUser = { ...fakeUser, role: { id: 2, name: 'LANDLORD' } };
      mockPrismaInstance.user.create.mockResolvedValue(fakeLandlordUser);
      mockPrismaInstance.role.findUnique.mockResolvedValue({ id: 2, name: 'LANDLORD' });
      mockPrismaInstance.emailVerificationToken.updateMany.mockResolvedValue({ count: 0 });
      mockPrismaInstance.emailVerificationToken.create.mockResolvedValue(fakeOtpToken);
      mockPrismaInstance.landLordProfile.create.mockResolvedValue({});

      const result = await authService.signup({
        fullName: fakeLandlordUser.fullName,
        email: fakeLandlordUser.email,
        phone: fakeLandlordUser.phone,
        password: 'validPassword',
        passwordRepeat: 'validPassword',
        role: 'landlord',
      });

      expect(mockPrismaInstance.user.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          role: { connect: { id: 2 } },
        }),
        include: {
          role: true,
          tenantProfile: false,
          landlordProfile: true,
        }
      }));
      expect(mockPrismaInstance.landLordProfile.create).toHaveBeenCalledWith({
        data: {
          profileImage: "",
          fullName: fakeLandlordUser.fullName,
          firstName: "",
          lastName: "",
          otherName: "",
          otherInfo: "",
          address: "",
          preference: "CALLS",
          NIN: "",
          driversLicense: "",
          BVN: "",
          userId: fakeLandlordUser.id
        }
      });
      expect(mockPrismaInstance.tenantProfile.create).not.toHaveBeenCalled();
      expect(result).toEqual(fakeLandlordUser);
    });
  });

  describe('login()', () => {
    it('should throw HTTPException if loginData is empty', async () => {
      await expect(authService.login({} as any)).rejects.toThrow(HTTPException);
      await expect(authService.login({} as any)).rejects.toHaveProperty('status', StatusCodes.BAD_REQUEST);
    });

    it('should throw HTTPException if user not found', async () => {
      const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
      mockPrismaInstance.user.findFirst.mockResolvedValue(null); // Simulate user not found
      await expect(
        authService.login({ emailOrPhone: 'nonexistent@example.com', password: 'password' })
      ).rejects.toThrow(HTTPException);
      await expect(
        authService.login({ emailOrPhone: 'nonexistent@example.com', password: 'password' })
      ).rejects.toHaveProperty('status', StatusCodes.NOT_FOUND);
      expect(mockPrismaInstance.user.findFirst).toHaveBeenCalled();
    });

    it('should throw HTTPException if user is not verified', async () => {
      const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
      mockPrismaInstance.user.findFirst.mockResolvedValue(fakeUser); // User exists but is not verified
      await expect(
        authService.login({ emailOrPhone: fakeUser.email, password: 'correctPassword' })
      ).rejects.toThrow(HTTPException);
      await expect(
        authService.login({ emailOrPhone: fakeUser.email, password: 'correctPassword' })
      ).rejects.toHaveProperty('status', StatusCodes.UNAUTHORIZED);
      await expect(
        authService.login({ emailOrPhone: fakeUser.email, password: 'correctPassword' })
      ).rejects.toThrow(/verify your email/i);
    });

    it('should throw HTTPException if password mismatch', async () => {
      const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
      mockPrismaInstance.user.findFirst.mockResolvedValue(fakeVerifiedUser); // User is verified
      (comparePassword as jest.Mock).mockResolvedValue(false); // Password mismatch
      await expect(
        authService.login({ emailOrPhone: fakeVerifiedUser.email, password: 'wrongPassword' })
      ).rejects.toThrow(HTTPException);
      await expect(
        authService.login({ emailOrPhone: fakeVerifiedUser.email, password: 'wrongPassword' })
      ).rejects.toHaveProperty('status', StatusCodes.UNAUTHORIZED);
      await expect(
        authService.login({ emailOrPhone: fakeVerifiedUser.email, password: 'wrongPassword' })
      ).rejects.toThrow(/invalid credentials/i);
    });

    it('should return token and cookie if login is valid and user is verified', async () => {
      const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
      mockPrismaInstance.user.findFirst.mockResolvedValue(fakeVerifiedUser); // User is verified
      (comparePassword as jest.Mock).mockResolvedValue(true); // Password matches

      const result = await authService.login({
        emailOrPhone: fakeVerifiedUser.email,
        password: 'correctPassword',
      });

      expect(mockPrismaInstance.user.findFirst).toHaveBeenCalledWith({
        where: { OR: [{ email: fakeVerifiedUser.email }, { phone: fakeVerifiedUser.email }] },
        include: { role: true },
      });
      expect(comparePassword).toHaveBeenCalledWith('correctPassword', fakeVerifiedUser.password);
      expect(generateToken).toHaveBeenCalledWith({
        id: fakeVerifiedUser.id,
        email: fakeVerifiedUser.email,
        role: fakeVerifiedUser.role.name,
      });
      expect(result).toHaveProperty('user', fakeVerifiedUser);
      expect(result).toHaveProperty('token', { token: 'mockToken', expiresIn: 86400 });
      expect(result).toHaveProperty('cookie', 'Authorization=mockToken; HttpOnly; Max-Age=86400;');
    });
  });

  describe('verifyEmail()', () => {
    it('should throw HTTPException if user not found', async () => {
      const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
      mockPrismaInstance.user.findUnique.mockResolvedValue(null); // Simulate user not found
      await expect(authService.verifyEmail('nonexistent@example.com', '123456')).rejects.toThrow(HTTPException);
      await expect(authService.verifyEmail('nonexistent@example.com', '123456')).rejects.toHaveProperty('status', StatusCodes.NOT_FOUND);
      expect(mockPrismaInstance.user.findUnique).toHaveBeenCalledWith({ where: { email: 'nonexistent@example.com' } });
    });

    it('should throw HTTPException if user is already verified', async () => {
      const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
      mockPrismaInstance.user.findUnique.mockResolvedValue(fakeVerifiedUser); // User already verified
      await expect(authService.verifyEmail(fakeVerifiedUser.email, '123456')).rejects.toThrow(HTTPException);
      await expect(authService.verifyEmail(fakeVerifiedUser.email, '123456')).rejects.toHaveProperty('status', StatusCodes.BAD_REQUEST);
      await expect(authService.verifyEmail(fakeVerifiedUser.email, '123456')).rejects.toThrow(/already verified/i);
    });

    it('should throw HTTPException for invalid or expired verification code (OTP)', async () => {
      const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
      mockPrismaInstance.user.findUnique.mockResolvedValue(fakeUser); // User exists, not verified
      mockPrismaInstance.emailVerificationToken.findMany.mockResolvedValue([]); // No valid tokens found
      await expect(authService.verifyEmail(fakeUser.email, '000000')).rejects.toThrow(HTTPException);
      await expect(authService.verifyEmail(fakeUser.email, '000000')).rejects.toHaveProperty('status', StatusCodes.UNAUTHORIZED);
      await expect(authService.verifyEmail(fakeUser.email, '000000')).rejects.toThrow(/invalid or expired/i);

      // Test with valid token but comparePassword returns false (incorrect OTP)
      mockPrismaInstance.emailVerificationToken.findMany.mockResolvedValue([fakeOtpToken]);
      (comparePassword as jest.Mock).mockResolvedValue(false);
      await expect(authService.verifyEmail(fakeUser.email, 'incorrectOTP')).rejects.toThrow(HTTPException);
      await expect(authService.verifyEmail(fakeUser.email, 'incorrectOTP')).rejects.toHaveProperty('status', StatusCodes.UNAUTHORIZED);
    });

    it('should successfully verify email with correct OTP', async () => {
      const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
      mockPrismaInstance.user.findUnique.mockResolvedValue(fakeUser); // User exists, not verified
      mockPrismaInstance.emailVerificationToken.findMany.mockResolvedValue([fakeOtpToken]); // Valid token exists
      (comparePassword as jest.Mock).mockResolvedValue(true); // OTP matches
      mockPrismaInstance.$transaction.mockImplementation(async (promises: Promise<any>[]) => { // Corrected: cb is an array of promises
        await Promise.all(promises); // Execute all promises in the transaction array
        return [
          { ...fakeUser, isVerified: true }, // Mock updated user
          { ...fakeOtpToken, used: true }, // Mock updated token
        ];
      });
      mockPrismaInstance.user.update.mockResolvedValue({ ...fakeUser, isVerified: true });
      mockPrismaInstance.emailVerificationToken.update.mockResolvedValue({ ...fakeOtpToken, used: true });


      const result = await authService.verifyEmail(fakeUser.email, '123456');

      expect(mockPrismaInstance.user.findUnique).toHaveBeenCalledWith({ where: { email: fakeUser.email } });
      expect(mockPrismaInstance.emailVerificationToken.findMany).toHaveBeenCalledWith({
        where: {
          userId: fakeUser.id,
          used: false,
          expiresAt: { gt: expect.any(Date) },
        },
      });
      expect(comparePassword).toHaveBeenCalledWith('123456', fakeOtpToken.token);
      expect(mockPrismaInstance.$transaction).toHaveBeenCalled();
      expect(mockPrismaInstance.user.update).toHaveBeenCalledWith({
        where: { id: fakeUser.id },
        data: { isVerified: true },
      });
      expect(mockPrismaInstance.emailVerificationToken.update).toHaveBeenCalledWith({
        where: { id: fakeOtpToken.id },
        data: { used: true },
      });
      expect(result).toEqual({ message: 'Email verified successfully' });
    });
  });

  describe('logout()', () => {
    it('should throw HTTPException if userId is empty', async () => {
      await expect(authService.logout('')).rejects.toThrow(HTTPException);
      await expect(authService.logout('')).rejects.toHaveProperty('status', StatusCodes.BAD_REQUEST);
    });

    it('should throw HTTPException if user not found', async () => {
      const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
      mockPrismaInstance.user.findUnique.mockResolvedValue(null); // Simulate user not found
      await expect(authService.logout('nonexistent-id')).rejects.toThrow(HTTPException);
      await expect(authService.logout('nonexistent-id')).rejects.toHaveProperty('status', StatusCodes.NOT_FOUND);
      expect(mockPrismaInstance.user.findUnique).toHaveBeenCalledWith({ where: { id: 'nonexistent-id' } });
    });

    it('should return user data on successful logout (user found)', async () => {
      const { prisma: mockPrismaInstance } = require('../../../prisma/prisma');
      mockPrismaInstance.user.findUnique.mockResolvedValue(fakeUser); // Simulate user found
      const result = await authService.logout(fakeUser.id);
      expect(mockPrismaInstance.user.findUnique).toHaveBeenCalledWith({ where: { id: fakeUser.id } });
      expect(result).toEqual(fakeUser);
    });
  });
});