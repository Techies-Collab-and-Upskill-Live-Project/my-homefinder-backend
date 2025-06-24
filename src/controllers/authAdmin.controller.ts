import { Request,Response } from "express";
import { AdminAuth } from "../services/authAdmin.service";
import { appError } from "../utils/appError";
const authAdmin = new AdminAuth()
export class authAdminController {
    
    construtor(){

    }

  async  signUp(req:Request,res:Response){
    try {
        const signUpResponse = await authAdmin.signUp(req.body)
        res.status(200).json({
            data:signUpResponse,
            message:"admin created"
        })
    } catch (error) {
        if(error instanceof appError){
            res.status(error.status).json({
                error:error.message,
                message:"an error occured"
            })
        }
    }
    }
}