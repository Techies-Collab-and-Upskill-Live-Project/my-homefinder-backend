import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import { UploadController } from "../controllers/upload.controller";
import { uploadMiddleware } from "../middlewares/upload.middleware";
import { asyncHandler } from "../utils/asyncHandler.util";

export class UploadRoute implements Routes {
  public path = "/api/v1/upload";
  public router: Router = Router();
  private uploadController = new UploadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      uploadMiddleware,
      asyncHandler(this.uploadController.uploadDoc),
    );
  }
}
