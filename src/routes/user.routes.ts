import express from "express"
import upload from "../middlewares/upload"
import userProfileController from "../controllers/profileCreation.controller";
import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
class UserRoutes implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/createProfile", upload.single("image"), userProfileController.createProfile);
  }
}
export default UserRoutes;