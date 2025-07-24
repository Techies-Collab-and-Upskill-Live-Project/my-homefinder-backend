import http from "http";
import { Server as SocketIoServer } from "socket.io";
import App from "./app"
import { UploadRoute } from "./routes/upload.route";
import { AuthRoute } from "./routes/auth.routes";
import { PropertyRoute } from "./routes/property.route";
import { MessageRoute } from "./routes/message.route";
import { UserRoute } from "./routes/user.routes";
import { ReviewRoute } from "./routes/review.route";
import { VerificationRoute } from "./routes/verification.route";
import { PORT } from "./config";
import { timeStamp } from "console";

const application = new App([
  new UploadRoute(),
  new AuthRoute(),
  new PropertyRoute(),
  new MessageRoute(),
  new UserRoute(),
  new ReviewRoute(),
  new VerificationRoute(),
]);

const app = application.getServer();
const server = http.createServer(app);
const io = new SocketIoServer(server, {
  cors:{
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection",  (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join_room", ({ roomId }) => {
    socket.join(roomId);
    console.log(`Client ${socket.id} joined room: ${roomId}`);
  });

  socket.on("send_message", (data) => {
    const { roomId, content, senderId, reciverId } = data;
    io.to(roomId).emit("receive_message", { 
      content, 
      senderId,
      reciverId,
    });
    console.log("Message sent to room:", roomId, "Content:", content);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const port = PORT || 8500;
server.listen(port, () => {
  console.log(`Server + WebSocket listening on port ${port}`)
});
