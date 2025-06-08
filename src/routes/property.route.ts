import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import { PropertyController } from "../controllers/property.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class PropertyRoute implements Routes {
  public path = "/api/v1/property";
  public router = Router();
  private propertyController = new PropertyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/location`,
      authMiddleware,
      this.propertyController.getPropertiesInLocation,
    );

    this.router.get(
      `${this.path}/nearby`,
      authMiddleware,
      this.propertyController.getPropertyNearBy,
    );
  }
}
