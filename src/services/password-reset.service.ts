import { prisma } from '../prisma/prisma';
import { EmailService } from './email.service'; 
import { OTPGenerator } from '../utils/otp-generator.util';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { config } from '../config';
import HTTPException from "../exceptions/http.exception";
import {StatusCodes} from "http-status-codes";

export class PasswordResetService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async initiateForgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (!user) {
        // Return success even for non-existent users to prevent email enumeration
        return {
          success: true,
          message: 'If an account with this email exists, you will receive a password reset code.',
        };
      }

      // Invalidate any existing unused tokens for this user
      await prisma.passwordResetToken.updateMany({
        where: {
          userId: user.id,
          used: false,
          expiresAt: {
            gt: new Date(),
          },
        },
        data: {
          used: true,
        },
      });

      // Generate OTP and expiry
      const otp = OTPGenerator.generateNumeric(6);
      const expiresAt = OTPGenerator.generateExpiryDate(config.otp.expiryMinutes);

      // Hash the OTP before storing
      const hashedOTP = await hashPassword(otp);

      // Store the token in database
      await prisma.passwordResetToken.create({
        data: {
          token: hashedOTP,
          userId: user.id,
          expiresAt,
          used: false,
        },
      });

      // Send email
      await this.emailService.sendPasswordResetEmail(email, otp);

      return {
        success: true,
        message: 'Password reset code sent to your email address.',
      };
    } catch (error) {
      throw new HTTPException(StatusCodes.BAD_REQUEST,'Failed to process password reset request');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      // Find all valid tokens that haven't expired
      const validTokens = await prisma.passwordResetToken.findMany({
        where: {
          used: false,
          expiresAt: {
            gt: new Date(),
          },
        },
        include: {
          user: true,
        },
      });

      // Find the matching token by comparing hashes
      let matchingTokenRecord = null;
      for (const tokenRecord of validTokens) {
        const isMatch = await comparePassword(token, tokenRecord.token);
        if (isMatch) {
          matchingTokenRecord = tokenRecord;
          break;
        }
      }

      if (!matchingTokenRecord) {
        return {
          success: false,
          message: 'Invalid or expired reset code.',
        };
      }

      // Hash the new password
      const hashedPassword = await hashPassword(newPassword);

      // Update user password and mark token as used
      await prisma.$transaction([
        prisma.user.update({
          where: { id: matchingTokenRecord.userId },
          data: { password: hashedPassword },
        }),
        prisma.passwordResetToken.update({
          where: { id: matchingTokenRecord.id },
          data: { used: true },
        }),
      ]);

      return {
        success: true,
        message: 'Password reset successfully.',
      };
    } catch (error) {
      throw new HTTPException(StatusCodes.BAD_REQUEST,'Failed to reset password');
    }
  }

  async cleanupExpiredTokens(): Promise<void> {
    try {
      await prisma.passwordResetToken.deleteMany({
        where: {
          OR: [
            { expiresAt: { lt: new Date() } },
            { used: true },
          ],
        },
      });
    } catch (error) {
      throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, "Error cleaning up expired tokens")
    }
  }
}