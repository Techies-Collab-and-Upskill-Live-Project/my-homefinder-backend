import crypto from 'crypto';

export class OTPGenerator {

// Generate a 6-digit numeric OTP

  static generateNumeric(length: number = 6): string {
    const digits = '0123456789';
    let otp = '';
    
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    
    return otp;
  }


// Generate a secure alphanumeric token
   
  static generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

// generate expiry date

  static generateExpiryDate(minutes: number): Date {
    const now = new Date();
    return new Date(now.getTime() + minutes * 60 * 1000);
  }
}