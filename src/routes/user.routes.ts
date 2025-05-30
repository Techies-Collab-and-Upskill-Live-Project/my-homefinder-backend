import express from "express"
import upload from "../middlewares/upload"
class Routes {
    public UserRouter: express.Router

    constructor() {
            this.UserRouter = express.Router();
    }

    public routeUser = () => {
        this.UserRouter.post('/createProfile?user=tenant',upload.single('image'))
        this.UserRouter.post('/createProfile?user=landlord')
    }

    
}