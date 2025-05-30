import express from "express"
import upload from "../middlewares/upload"
import userProfileController from "../controllers/profileCreation.controller";
class Routes {
    public UserRouter: express.Router

    constructor() {
            this.UserRouter = express.Router();
    }

    public routeUser = () => {
        this.UserRouter.post('/createProfile?user=tenant',upload.single('image'),userProfileController.createProfile)
        this.UserRouter.post('/createProfile?user=landlord',upload.single('image'))
    }

    
}