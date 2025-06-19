import { NextFunction, Request, Response } from "express";
import { PasswordResetService } from "../services/password-reset.service";
import {
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ApiResponse,
  RequestWithUser,
} from "../interfaces/auth.interface";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "../services/auth.service";
import HTTPException from "../exceptions/http.exception";

export class AuthController {
  private passwordResetService: PasswordResetService;
  private authService: AuthService;
  constructor() {
    this.passwordResetService = new PasswordResetService();
    this.authService = new AuthService();
  }

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.signup(req.body);
      res
        .status(StatusCodes.CREATED)
        .json({ data: user, message: "User registered" });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, cookie, user } = await this.authService.login(req.body);
      res.setHeader("Set-Cookie", [cookie]);
      res
        .status(StatusCodes.OK)
        .json({ message: "Login successful", token, user });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user?.id) {
        throw new Error("User ID is missing in request.");
      }
      const user = await this.authService.logout(req.user.id);
      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res
        .status(StatusCodes.OK)
        .json({ message: "User logged out", data: user });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { email }: ForgotPasswordRequest = req.body;

      const result =
        await this.passwordResetService.initiateForgotPassword(email);

      const response: ApiResponse = {
        success: result.success,
        message: result.message,
      };

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error("Forgot password error:", error);

      const response: ApiResponse = {
        success: false,
        message:
          "An error occurred while processing your request. Please try again later.",
      };
      throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, response.message);
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
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

      res.status(StatusCodes.OK).json(response);
    } catch (error) {

      const response: ApiResponse = {
        success: false,
        message:
          "An error occurred while processing your request. Please try again later.",
      };

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response.message);
    }
  };
}
