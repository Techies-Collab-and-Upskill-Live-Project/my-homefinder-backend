import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import { AuthController } from '../controllers/auth.controller';
import { validateForgotPassword, validateResetPassword } from '../middlewares/validation.middleware';
import { forgotPasswordLimiter, resetPasswordLimiter } from '../middlewares/rate-limiter.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { login } from '../controllers/login.controller';
import { signup } from '../controllers/signup.controller';


export class AuthRoute implements Routes {
  public path = '/api/auth';
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
    this.router.post('/login', login);
    this.router.post(`/signup`, signup);
  }
}
