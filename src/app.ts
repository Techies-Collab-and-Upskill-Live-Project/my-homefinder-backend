import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { CREDENTIALS, PORT } from "./config";
import errorMiddleware from "./middlewares/error.middleware";
import { notFoundError } from "./middlewares/notfound.middleware";
import { PrismaClient } from "../generated/prisma";
import { authRoutes } from "./routes/authRoutes";

const app = express();
const prisma = new PrismaClient();

// Connect to the database
(async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1);
  }
})();

// Security and utility middleware
app.use(morgan("combined"));
app.use(helmet());
app.use(cors({ origin: CREDENTIALS, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error middleware
app.use(errorMiddleware);
app.use(notFoundError);

// Start server
app.listen(PORT || 3000, () => {
  console.log(`Server running on port ${PORT || 3000}`);
});
