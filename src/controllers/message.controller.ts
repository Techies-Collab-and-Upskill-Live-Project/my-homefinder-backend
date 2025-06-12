import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestWithUser } from "../interfaces/auth.interface";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

export class MessageController {
  public sendMessage = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { receiverId, content, propertyId } = req.body;
      const senderId = req.user.id;

      const message = await prisma.message.create({
        data: {
          content,
          senderId,
          receiverId,
          propertyId: propertyId || null,
        },
      });

      res.status(StatusCodes.CREATED).json({ message: "Message sent", data: message });
    } catch (error) {
      next(error);
    }
  };

  public getThread = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user.id;
      const withUserId = req.params.withUserId;

      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: withUserId },
            { senderId: withUserId, receiverId: userId },
          ],
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      res.status(StatusCodes.OK).json({ data: messages });
    } catch (error) {
      next(error);
    }
  };
}
