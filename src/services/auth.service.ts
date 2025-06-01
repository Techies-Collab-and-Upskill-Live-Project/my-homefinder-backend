import { StatusCodes } from "http-status-codes";
import HTTPException from "../exceptions/http.exception";
import { isEmpty } from "../utils/isEmpty.util";
import { PrismaClient, User } from "@prisma/client";
import { comparePassword, hashPassword } from "../utils/hash.util";
import {
  loginDataType,
  signUpDataType,
  TokenDataType,
} from "../interfaces/auth.interface";
import { generateToken } from "../utils/jwt.util";

export class AuthService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  public signup = async (userData: signUpDataType): Promise<User> => {
    if (isEmpty(userData))
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Empty user data");

    const { fullName, email, phone, password, role, passwordRepeat } = userData;
    const allowedRoles = ["renter", "landlord"];
    if (!role || !allowedRoles.includes(role.toLowerCase())) {
      throw new HTTPException(
        StatusCodes.BAD_REQUEST,
        "Invalid or missing role. Role must be renter or landlord",
      );
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser)
      throw new HTTPException(
        StatusCodes.BAD_REQUEST,
        "Email already registered",
      );

    if (password !== passwordRepeat)
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Passwords dont match");
    const userRole = await this.prisma.role.findUnique({
      where: { name: role.toLowerCase() },
    });

    if (!userRole) {
      throw new HTTPException(
        StatusCodes.BAD_REQUEST,
        "Role not found in system",
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await this.prisma.user.create({
      data: {
        fullName: fullName,
        email: email,
        phone: phone,
        password: hashedPassword,
        roleId: userRole.id,
      },
    });
    return newUser;
  };

  public login = async (
    loginData: loginDataType,
  ): Promise<{ user: User; token: TokenDataType; cookie: string }> => {
    if (isEmpty(loginData))
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Empty login data");

    const { emailOrPhone, password } = loginData;
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      },
      include: { role: true },
    });

    if (!user) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "User not found");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role.name,
    });

    const cookie = this.createCookie(token);
    return { user, cookie, token: token };
  };

  public logout = async (userId: string): Promise<User> => {
    if (isEmpty(userId))
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Empty user Id");
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "User not found");
    }

    return user;
  };

  private createCookie(tokenData: TokenDataType): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
