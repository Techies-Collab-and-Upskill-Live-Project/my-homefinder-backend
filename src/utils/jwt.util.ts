import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { TokenDataType } from "../interfaces/auth.interface";

export const generateToken = (payload: object): TokenDataType => {
  const expiresIn = 60 * 60 * 24; // 1 day
  const token = jwt.sign(payload, JWT_SECRET!, { expiresIn });
  return { token, expiresIn };
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET!);
};
