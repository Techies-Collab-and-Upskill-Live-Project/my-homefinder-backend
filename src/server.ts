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
import { registerMessagingHandlers } from "./socket/messaging.socket";
import jwt from "jsonwebtoken";
import chalk from "chalk";
import {websocketLogger} from "./socket/websocketLogger";

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
  cors: { origin: "*", methods: ["GET", "POST"] },
});


io.engine.on("connection_error", (err) => {
  console.error("❌ WebSocket connection error:", err.message);
});

// JWT auth middleware
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("Authentication error"));
  try {
    socket.data.user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

io.use(websocketLogger);

// Register all socket event handlers
registerMessagingHandlers(io);

server.listen(process.env.PORT || 8500, () => {
  console.log("Server + WebSocket running");
});
