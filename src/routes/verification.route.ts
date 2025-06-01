import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import { authMiddleware } from "../middlewares/auth.middleware";
import { VerificationController } from "../controllers/verification.controller";

export class VerificationRoutes implements Routes {
  public path = "/api/v1/verify";
  public router: Router = Router();
  private verificationController = new VerificationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/id-docuement`,
      authMiddleware,
      this.verificationController.verify,
    );
  }
}
