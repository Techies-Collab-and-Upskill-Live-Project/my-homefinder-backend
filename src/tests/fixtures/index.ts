import bcrypt from 'bcryptjs';

export const testUsers = {
  validUser: {
    id: 'test-user-id-1',
    email: 'test@example.com',
    password: 'hashedPassword123',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  nonExistentUser: {
    email: 'nonexistent@example.com',
  },
};

export const testTokens = {
  validToken: {
    id: 'test-token-id-1',
    token: 'hashedOTP123',
    userId: 'test-user-id-1',
    expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    used: false,
    createdAt: new Date(),
  },
  expiredToken: {
    id: 'test-token-id-2',
    token: 'hashedOTP456',
    userId: 'test-user-id-1',
    expiresAt: new Date(Date.now() - 60 * 1000), // 1 minute ago
    used: false,
    createdAt: new Date(),
  },
  usedToken: {
    id: 'test-token-id-3',
    token: 'hashedOTP789',
    userId: 'test-user-id-1',
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    used: true,
    createdAt: new Date(),
  },
};

export const generateHashedOTP = async (otp: string): Promise<string> => {
  return await bcrypt.hash(otp, 12);
};