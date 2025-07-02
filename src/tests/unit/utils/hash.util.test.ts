import { hashPassword, comparePassword } from '../../../utils/hash.util';

describe('Authentication Utilities', () => {

  let hashedPassword = '';
  const testPassword = 'mySecurePassword123!';
  const anotherPassword = 'anotherPassword456';

  beforeAll(async () => {
    // Hash a password once to use in multiple compare tests
    hashedPassword = await hashPassword(testPassword);
  });

  describe('hashPassword', () => {
    it('should return a string', async () => {
      const hash = await hashPassword(testPassword);
      expect(typeof hash).toBe('string');
    });

    it('should return a non-empty string', async () => {
      const hash = await hashPassword(testPassword);
      expect(hash.length).toBeGreaterThan(0);
    });

    it('should return a hash that starts with "$2b$" (or "$2a$", "$2y$")', async () => {
      // Note: bcrypt versions might use $2a$, $2b$, or $2y$
      const hash = await hashPassword(testPassword);
      expect(hash).toMatch(/^\$2[aby]\$/);
    });

    it('should produce different hashes for the same password due to salting', async () => {
      const hash1 = await hashPassword(testPassword);
      const hash2 = await hashPassword(testPassword);
      expect(hash1).not.toEqual(hash2);
    });
  });

  describe('comparePassword', () => {
    it('should return true for a correct password', async () => {
      const isMatch = await comparePassword(testPassword, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it('should return false for an incorrect password', async () => {
      const isMatch = await comparePassword(anotherPassword, hashedPassword);
      expect(isMatch).toBe(false);
    });

    it('should return false when comparing an empty string with a valid hash', async () => {
      const isMatch = await comparePassword('', hashedPassword);
      expect(isMatch).toBe(false);
    });

    it('should return false when comparing a valid password with an empty hash', async () => {
      const isMatch = await comparePassword(testPassword, '');
      expect(isMatch).toBe(false);
    });

    it('should return false when comparing with a malformed hash', async () => {
      const malformedHash = 'thisisnotavalidhash';
      const isMatch = await comparePassword(testPassword, malformedHash);
      expect(isMatch).toBe(false);
    });

    it('should return true for an empty password if it was hashed as empty', async () => {
      const emptyPasswordHash = await hashPassword('');
      const isMatch = await comparePassword('', emptyPasswordHash);
      expect(isMatch).toBe(true);
    });
  });
});