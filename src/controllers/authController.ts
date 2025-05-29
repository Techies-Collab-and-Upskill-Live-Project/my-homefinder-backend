import { Request, Response } from "express";
import { PasswordResetService } from "../services/passwordResetService";
import {
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ApiResponse,
} from "../types/auth";

export class AuthController {
  private passwordResetService: PasswordResetService;

  constructor() {
    this.passwordResetService = new PasswordResetService();
  }

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email }: ForgotPasswordRequest = req.body;

      const result =
        await this.passwordResetService.initiateForgotPassword(email);

      const response: ApiResponse = {
        success: result.success,
        message: result.message,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Forgot password error:", error);

      const response: ApiResponse = {
        success: false,
        message:
          "An error occurred while processing your request. Please try again later.",
      };

      res.status(500).json(response);
    }
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, newPassword }: ResetPasswordRequest = req.body;

      const result = await this.passwordResetService.resetPassword(
        token,
        newPassword,
      );

      const response: ApiResponse = {
        success: result.success,
        message: result.message,
      };

      const statusCode = result.success ? 200 : 400;
      res.status(statusCode).json(response);
    } catch (error) {
      console.error("Reset password error:", error);

      const response: ApiResponse = {
        success: false,
        message:
          "An error occurred while processing your request. Please try again later.",
      };

      res.status(500).json(response);
    }
  };
}
