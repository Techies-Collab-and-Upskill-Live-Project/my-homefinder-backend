import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import { UploadController } from "../controllers/upload.controller";
import { uploadMiddleware } from "../middlewares/upload.middileware";

export class UploadRoute implements Routes {
  public path = "/upload";
  public router: Router = Router();
  private uploadController = new UploadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      uploadMiddleware.single("doc"),
      this.uploadController.uploadDoc,
    );
  }
}
