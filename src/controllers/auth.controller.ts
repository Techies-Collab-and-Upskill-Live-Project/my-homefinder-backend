import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/hash';

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    const userRole = await prisma.role.findUnique({ where: { name: role.toLowerCase() } });
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
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
