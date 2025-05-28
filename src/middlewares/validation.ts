import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import { ApiResponse } from '../types/auth';

// Validation error handler middleware
const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response: ApiResponse = {
      success: false,
      message: 'Validation failed',
      data: { errors: errors.array() },
    };
    res.status(400).json(response);
    return;
  }
  next();
};

// Forgot password validation rules
export const forgotPasswordValidationRules = (): ValidationChain[] => [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
];

// Reset password validation rules
export const resetPasswordValidationRules = (): ValidationChain[] => [
  body('token')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('Please provide a valid 6-digit code'),
  
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
];

// Export the validation middleware
export const validateForgotPassword = [
  ...forgotPasswordValidationRules(),
  handleValidationErrors,
];

export const validateResetPassword = [
  ...resetPasswordValidationRules(),
  handleValidationErrors,
];