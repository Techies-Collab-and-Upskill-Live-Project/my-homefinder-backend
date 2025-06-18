// import { User } from "@prisma/client";
import { Request } from "express";

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface loginDataType {
  emailOrPhone: string;
  password: string;
}

  export interface RequestWithUser extends Request {
    user:{
      id: string;
      role?: string;
      roleId?:number;
      [key: string]: any;
    }
  }

export interface DataStoreInJWT {
  id: string;
}

export interface TokenDataType {
  token: string;
  expiresIn: number;
}

export interface signUpDataType {
  email: string;
  role: string;
  phone: string;
  password: string;
  fullName: string;
  passwordRepeat: string;
}
