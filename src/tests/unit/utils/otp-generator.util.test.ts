import { OTPGenerator } from "../../../utils/otp-generator.util";

describe("OTPGenerator", () => {
  describe("generateNumeric", () => {
    it("should generate a numeric OTP of default length 6", () => {
      const otp = OTPGenerator.generateNumeric();
      expect(otp).toHaveLength(6);
      expect(/^\d+$/.test(otp)).toBe(true);
    });

    it("should generate a numeric OTP of specified length", () => {
      const otp = OTPGenerator.generateNumeric(8);
      expect(otp).toHaveLength(8);
      expect(/^\d+$/.test(otp)).toBe(true);
    });

    it("should generate different OTPs on multiple calls", () => {
      const otp1 = OTPGenerator.generateNumeric();
      const otp2 = OTPGenerator.generateNumeric();
      expect(otp1).not.toBe(otp2);
    });
  });

  describe("generateSecureToken", () => {
    it("should generate a secure token of default length", () => {
      const token = OTPGenerator.generateSecureToken();
      expect(token).toHaveLength(64); // 32 bytes = 64 hex chars
      expect(/^[a-f0-9]+$/.test(token)).toBe(true);
    });

    it("should generate a secure token of specified length", () => {
      const token = OTPGenerator.generateSecureToken(16);
      expect(token).toHaveLength(32); // 16 bytes = 32 hex chars
    });
  });

  describe("generateExpiryDate", () => {
    it("should generate expiry date with specified minutes", () => {
      const minutes = 15;
      const expiryDate = OTPGenerator.generateExpiryDate(minutes);
      const expectedTime = new Date(Date.now() + minutes * 60 * 1000);

      // Allow for small time difference in test execution
      expect(
        Math.abs(expiryDate.getTime() - expectedTime.getTime()),
      ).toBeLessThan(1000);
    });
  });
});
