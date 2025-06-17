import express from "express"
import upload from "../middlewares/upload"
import userProfileController from "../controllers/profileCreation.controller";
import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import tenantAccess from "../middlewares/tenantAccess.middleware";
import landLordAccess from "../middlewares/landLordAccess.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

class UserRoutes implements Routes {
  public path ="/api/v1/users"
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  // create profile eendpoint will be lik'be /createProfile/userId?user=tenent, can also be ?user=landlord
  //same as that of update profile

  private initializeRoutes() {
    this.router.post("/createProfile/", upload.single("image"),authMiddleware, userProfileController.createProfile);
    this.router.patch("/updateProfile/:userId", upload.single("image"),authMiddleware, userProfileController.updateProfile)
    this.router.get("/getTenantProfile/:userId",tenantAccess,authMiddleware,userProfileController.getProfile)
    this.router.get("/getLandlordProfile/:userId",landLordAccess,authMiddleware,userProfileController.getProfile)
  }
}
export default UserRoutes;