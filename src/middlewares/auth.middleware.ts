import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config";
import { verify } from "jsonwebtoken";
import { DataStoreInJWT, RequestWithUser } from "../interfaces/auth.interface";
import HTTPException from "../exceptions/http.exception";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const prisma = new PrismaClient();
    const Authorization =
      req.cookies["Authorization"] ||
      (req.headers.authorization
        ? req.headers.authorization.split("Bearer ")[1]
        : null);

    if (Authorization) {
      const secretKey: string = JWT_SECRET!;
      const verificationResponse = verify(
        Authorization,
        secretKey,
      ) as DataStoreInJWT;
      const userId = verificationResponse.id;
      const findUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (findUser) {
        (req as RequestWithUser).user = findUser;
        next();
      } else {
        next(
          new HTTPException(
            StatusCodes.UNAUTHORIZED,
            "Wrong authentication token",
          ),
        );
      }
    } else {
      next(
        new HTTPException(
          StatusCodes.BAD_REQUEST,
          "Authentication token missing",
        ),
      );
    }
  } catch (error) {
    next(
      new HTTPException(StatusCodes.UNAUTHORIZED, "Wrong authentication token"),
    );
  }
};
