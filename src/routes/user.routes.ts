import upload from "../middlewares/upload"
import userProfileController from "../controllers/profileCreation.controller";
import { Router } from "express";
import { Routes } from "../interfaces/route.interface";

class UserRoutes implements Routes {
  public path ="/api/v1/users"
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  // create profile eendpoint will be lie /createProfile/iegqetye?user=tenent, can also be ?user=landlord
  private initializeRoutes() {
    this.router.post("/createProfile/:userId", upload.single("image"), userProfileController.createProfile);
    this.router.patch("updateProfile/:userId", upload.single("image"), userProfileController.updateProfile)
  }
}
export default UserRoutes;