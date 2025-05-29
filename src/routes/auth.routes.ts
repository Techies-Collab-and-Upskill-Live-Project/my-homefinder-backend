import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateForgotPassword, validateResetPassword } from '../middlewares/validation.middleware';
import { forgotPasswordLimiter, resetPasswordLimiter } from '../middlewares/rate-limiter.middleware';

const router = Router();
const authController = new AuthController();

// POST /api/auth/forgot-password
router.post(
  '/forgot-password',
  forgotPasswordLimiter,
  validateForgotPassword,
  authController.forgotPassword
);

// POST /api/auth/reset-password
router.post(
  '/reset-password',
  resetPasswordLimiter,
  validateResetPassword,
  authController.resetPassword
);

export { router as authRoutes };