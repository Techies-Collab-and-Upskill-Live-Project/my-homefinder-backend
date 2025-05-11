import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { CREDENTIALS, PORT } from "./config";
import errorMiddleware from "./middlewares/error.middleware";
import { notFoundError } from "./middlewares/notfound.middleware";
import { Routes } from "./interfaces/route.interface";
import { PrismaClient } from "../generated/prisma";
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// app.get("/", (_req, res) => {
//   res.send("MyHomeFinder Backend API");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

class App {
  public port: number;
  public app: Application;
  public prisma: PrismaClient;

  constructor(routes: Routes[]) {
    this.port = (PORT || 8500) as number;
    this.app = express();
    this.prisma = new PrismaClient();

    this.connectDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares = () => {
    this.app.use(morgan("combined"));
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors({ origin: CREDENTIALS, credentials: true }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  };

  private initializeRoutes = (routes: Routes[]) => {
    routes.forEach(({ router }) => {
      this.app.use("/", router);
    });
  };

  private connectDatabase = async () => {
    try {
      await this.prisma.$connect();
      console.log("Connected to database");
    } catch (error) {
      console.error("Failed to connect to database");
    }
  };

  private initializeErrorHandling = () => {
    this.app.use(errorMiddleware);
    this.app.use(notFoundError);
  };

  public startServer = async () => {
    this.app.listen(this.port, (error) => {
      if (error) {
        console.log(`Failed to start server on port ${this.port}`);
      }
      console.log(`Server listening on port ${this.port}`);
    });
  };
}

export default App;
