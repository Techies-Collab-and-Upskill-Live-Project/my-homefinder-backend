import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import { authAdminController } from "../controllers/authAdmin.controller";
const authAdmin = new authAdminController()
export class adminRoute implements Routes {
    public path = "/adminAuth"
    public router : Router = Router()
    constructor(){

    }

    initializeRoutes(){
        this.router.post("/signup",authAdmin.signUp)
    }
}
