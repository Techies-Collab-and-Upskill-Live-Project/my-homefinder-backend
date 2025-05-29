import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import { AuthController } from '../controllers/auth.controller';
import { validateForgotPassword, validateResetPassword } from '../middlewares/validation.middleware';
import { forgotPasswordLimiter, resetPasswordLimiter } from '../middlewares/rate-limiter.middleware';
import { asyncHandler } from '../utils/asyncHandler';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router: Router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/forgot-password`,
      forgotPasswordLimiter,
      validateForgotPassword,
      asyncHandler(this.authController.forgotPassword)
    );

    this.router.post(
      `${this.path}/reset-password`,
      resetPasswordLimiter,
      validateResetPassword,
      asyncHandler(this.authController.resetPassword)
    );
  }
}
