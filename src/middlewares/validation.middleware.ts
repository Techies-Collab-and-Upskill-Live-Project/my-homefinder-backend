// src/middlewares/validation.middleware.ts

// IMPORTANT: Ensure all imports are at the very top of the file
import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import { ApiResponse } from '../interfaces/auth.interface'; // Assuming this path is correct

/**
 * @file This file contains validation middleware functions using express-validator.
 * It defines rules for various authentication-related endpoints like signup, login,
 * email verification, and password reset, and includes a general error handler.
 */

/**
 * Validation error handler middleware.
 * This function checks for validation errors from express-validator and
 * sends a standardized error response if errors are found.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 */
const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response: ApiResponse = {
      success: false,
      message: 'Validation failed',
      data: { errors: errors.array() },
    };
    res.status(400).json(response);
    return; // Important: return after sending response to prevent further execution
  }
  next(); // If no errors, proceed to the next middleware/route handler
};

/**
 * Validation rules for user signup.
 * Ensures that all required fields are present and correctly formatted.
 * @returns {ValidationChain[]} An array of validation chains.
 */
export const signupValidationRules = (): ValidationChain[] => [
  // Validate full name: must not be empty
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required'),

  // Validate email: must be a valid email format and normalized
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(), // Converts email to lowercase

  // Validate phone number: must be a valid mobile phone number
  body('phone')
    .isMobilePhone('any') // 'any' allows various international formats
    .withMessage('Please provide a valid phone number'),

  // Validate password: must be at least 6 characters long
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  // Validate passwordRepeat: custom validation to ensure it matches the password
  body('passwordRepeat')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true; // Return true if validation passes
    })
    .withMessage("Passwords don't match"), // Custom message for password mismatch

  // Validate role: must be either 'renter' or 'landlord'
  body('role')
    .isIn(['renter', 'landlord'])
    .withMessage('Invalid role'),
];

/**
 * Validation rules for user login.
 * Ensures that email/phone and password fields are not empty.
 * @returns {ValidationChain[]} An array of validation chains.
 */
export const loginValidationRules = (): ValidationChain[] => [
  // Validate emailOrPhone: must not be empty
  body('emailOrPhone')
    .notEmpty()
    .withMessage('Email or phone is required'),

  // Validate password: must not be empty
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

/**
 * Validation rules for email verification.
 * Ensures that email is valid and OTP is a 6-digit numeric string.
 * @returns {ValidationChain[]} An array of validation chains.
 */
export const verifyEmailValidationRules = (): ValidationChain[] => [
  // Validate email: must be a valid email format
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),

  // Validate OTP: must be exactly 6 digits long and numeric
  body('otp')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('Please provide a valid 6-digit verification code'),
];

/**
 * Validation rules for forgot password requests.
 * Ensures that the email field is a valid email format.
 * @returns {ValidationChain[]} An array of validation chains.
 */
export const forgotPasswordValidationRules = (): ValidationChain[] => [
  // Validate email: must be a valid email format
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
];

/**
 * Validation rules for resetting password.
 * Ensures that token is a 6-digit numeric string and new password meets complex requirements.
 * @returns {ValidationChain[]} An array of validation chains.
 */
export const resetPasswordValidationRules = (): ValidationChain[] => [
  // Validate token: must be exactly 6 digits long and numeric
  body('token')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('Please provide a valid 6-digit code'),

  // Validate newPassword: must be at least 8 characters long and meet complexity rules
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    ),
];


export const validateVerifyEmail = [
  ...verifyEmailValidationRules(),
  handleValidationErrors,
];

export const validateForgotPassword = [
  ...forgotPasswordValidationRules(),
  handleValidationErrors,
];

export const validateResetPassword = [
  ...resetPasswordValidationRules(),
  handleValidationErrors,
];
