import { prisma } from "../prisma/prisma";
import HttpException from "../exceptions/http.exception";
import {StatusCodes} from "http-status-codes";


export class MessageService {
  public async sendMessage(senderId: string, data: { receiverId: string; content: string; propertyId?: string }) {
    try{
      const message = await prisma.message.create({
        data: {
          senderId,
          receiverId: data.receiverId,
          content: data.content,
          propertyId: data.propertyId || null,
        },
      });
      return {data: message}
    } catch (err){
      throw new HttpException(StatusCodes.BAD_REQUEST, "Provide reciever Id")
    }
  }

  public async getMessagesInThread(userId: string, withUserId: string) {
    const messageTheard = await prisma.message.findMany({
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
    return { data: messageTheard }
  }
}