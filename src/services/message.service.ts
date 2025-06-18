import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class MessageService {
  public async sendMessage(senderId: string, data: { receiverId: string; content: string; propertyId?: string }) {
    return await prisma.message.create({
      data: {
        senderId,
        receiverId: data.receiverId,
        content: data.content,
        propertyId: data.propertyId || null,
      },
    });
  }

  public async getMessagesInThread(userId: string, withUserId: string) {
    return await prisma.message.findMany({
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
  }
}