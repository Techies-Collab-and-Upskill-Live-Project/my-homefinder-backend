import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import { StatusCodes } from "http-status-codes";
import { MessageService } from "../services/message.service";

export class MessageController {
  public messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  public sendMessage = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const senderId = req.user.id;
      const message = await this.messageService.sendMessage(senderId, req.body);
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
      const messages = await this.messageService.getMessagesInThread(req.user.id, req.params.withUserId);
      res.status(StatusCodes.OK).json({ data: messages });
    } catch (error) {
      next(error);
    }
  };
}