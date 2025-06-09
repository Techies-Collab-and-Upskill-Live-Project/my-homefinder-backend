import { Router, RequestHandler } from "express";
import { Routes } from "../interfaces/route.interface";
import { PropertyController } from "../controllers/property.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import asyncHandler from "express-async-handler";

export class PropertyRoute implements Routes {
  public path = "/api/v1/property";
  public router = Router();
  private propertyController = new PropertyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      authMiddleware,
      asyncHandler(this.propertyController.createProperty as RequestHandler)
    );

    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      asyncHandler(this.propertyController.getPropertyById as RequestHandler)
    );

    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      asyncHandler(this.propertyController.updateProperty as RequestHandler)
    );

    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      asyncHandler(this.propertyController.deleteProperty as RequestHandler)
    );

    this.router.get(
      `${this.path}/location`,
      authMiddleware,
      asyncHandler(this.propertyController.getPropertiesInLocation as RequestHandler)
    );

    this.router.get(
      `${this.path}/nearby`,
      authMiddleware,
      asyncHandler(this.propertyController.getPropertyNearBy as RequestHandler)
    );
  }
}