import { Request, Response, NextFunction } from "express";
import { MessageController } from "../../../controllers/message.controller";
import { MessageService } from "../../../services/message.service";
import { RequestWithUser } from "../../../interfaces/auth.interface";

// Test suite for MessageController
describe("MessageController", () => {
  let messageController: MessageController;
  let messageService: MessageService;

  let mockReq: Partial<RequestWithUser>;
  let mockRes: Partial<Response>;
  let mockNext: Partial<NextFunction>;

  beforeEach(() => {
    messageController = new MessageController();
    messageService = messageController["messageService"] = {
      sendMessage: jest.fn(),
      getMessagesInThread: jest.fn(),
    } as any;
  });

  describe("sendMessage", () => {
    it("should send a message and return it", async () => {
      const mockMessage = { id: 1, content: "Hello", senderId: "user1", receiverId: "user2" };

      mockReq = {
        user: { id: "user1" },
        body: { content: "Hello", receiverId: "user2" },
      };

      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockNext = jest.fn();

      (messageService.sendMessage as jest.Mock).mockResolvedValue(mockMessage);

      await messageController.sendMessage(
        mockReq as RequestWithUser,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(messageService.sendMessage).toHaveBeenCalledWith("user1", {
        receiverId: "user2",
        content: "Hello",
        propertyId: undefined,
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Message sent", data: mockMessage });
    });
  });

  describe("getThread", () => {
    it("should return a thread of messages between two users", async () => {
      const mockMessages = [
        { id: 1, content: "Hello", senderId: "user1", receiverId: "user2" },
        { id: 2, content: "Hi", senderId: "user2", receiverId: "user1" },
      ];

      mockReq = {
        user: { id: "user1" },
        params: { withUserId: "user2" },
      };

      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockNext = jest.fn();

      (messageService.getMessagesInThread as jest.Mock).mockResolvedValue(mockMessages);

      await messageController.getThread(
        mockReq as RequestWithUser,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(messageService.getMessagesInThread).toHaveBeenCalledWith("user1", "user2");
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ data: mockMessages });
    });
  });
});