import { Request, Response } from 'express';
import { PasswordResetService } from '../services/password-reset.service';
import { ForgotPasswordRequest, ResetPasswordRequest, ApiResponse } from '../interfaces/auth.interface';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient();

export class AuthController {
  private passwordResetService: PasswordResetService;

  constructor() {
    this.passwordResetService = new PasswordResetService();
  }

  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fullName, email, phone, password, role } = req.body;

      const allowedRoles = ['renter', 'landlord'];
      if (!role || !allowedRoles.includes(role.toLowerCase())) {
        res.status(400).json({ message: 'Invalid or missing role' });
        return;
      }

      const existingUser = await prisma.user.findFirst({
        where: { OR: [{ email }, { phone }] },
      });

      if (existingUser) {
        res.status(400).json({ message: 'Email or phone already in use' });
        return;
      }

      const userRole = await prisma.role.findUnique({
        where: { name: role.toLowerCase() },
      });

      if (!userRole) {
        res.status(400).json({ message: 'Role not found in system' });
        return;
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await prisma.user.create({
        data: {
          fullName,
          email,
          phone,
          password: hashedPassword,
          roleId: userRole.id,
        },
      });

      res.status(201).json({
        message: 'Signup successful',
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          phone: newUser.phone,
          role: userRole.name,
        },
      });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { emailOrPhone, password } = req.body;

      if (!emailOrPhone || !password) {
        res.status(400).json({ message: 'Email/Phone and password are required' });
        return;
      }

      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
        },
        include: { role: true },
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role.name,
      });

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role.name,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email }: ForgotPasswordRequest = req.body;

      const result = await this.passwordResetService.initiateForgotPassword(email);

      const response: ApiResponse = {
        success: result.success,
        message: result.message,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Forgot password error:', error);
      
      const response: ApiResponse = {
        success: false,
        message: 'An error occurred while processing your request. Please try again later.',
      };

      res.status(500).json(response);
    }
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, newPassword }: ResetPasswordRequest = req.body;

      const result = await this.passwordResetService.resetPassword(token, newPassword);

      const response: ApiResponse = {
        success: result.success,
        message: result.message,
      };

      const statusCode = result.success ? 200 : 400;
      res.status(statusCode).json(response);
    } catch (error) {
      console.error('Reset password error:', error);
      
      const response: ApiResponse = {
        success: false,
        message: 'An error occurred while processing your request. Please try again later.',
      };

      res.status(500).json(response);
    }
  };
}