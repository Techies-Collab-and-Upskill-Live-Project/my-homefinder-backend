import { Server, Socket } from "socket.io";
import {MessageService} from "../services/message.service";

const getRoomId = (userA: string, userB: string) => [userA, userB].sort().join("_");

export function registerMessagingHandlers(io: Server) {
    const messageService = new MessageService();

    io.on("connection", (socket: Socket) => {
        const currentUser = socket.data.user;

        socket.on("join_room", async ({ withUserId }) => {
            const roomId = getRoomId(currentUser.id, withUserId);
            socket.join(roomId);

            const history = await messageService.getMessagesInThread(currentUser.id, withUserId);
            socket.emit("chat_history", history);
        });

        socket.on("send_message", async ({ receiverId, content, propertyId }) => {
            const message = await messageService.sendMessage(currentUser.id, { receiverId, content, propertyId });
            const roomId = getRoomId(currentUser.id, receiverId);
            io.to(roomId).emit("receive_message", message);
        });
    });
}
