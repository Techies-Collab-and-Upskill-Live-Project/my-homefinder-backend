import { Request,Response } from "express"
import profileCreation from "../services/userProfileCreation.service"
class usercontroller{
    public createProfile = async (req:Request,res:Response) => {
       try {
         const user = req.query.user
        const image = req.file?.path
        const body = req.body

        if(!image){throw new Error("user image is required")}
        if(user == 'tenant'){
        const createProfile = await profileCreation.createProfileTenant(image,body)
        res.status(200).json({
            success:true,
            message:"tenant profile creation was succesfully",
            data:createProfile
        })
    }

    if(user == 'landlord'){
        // landlord logic from service
    }

       } catch (error) {
        if(error instanceof Error){
            res.status(404).json({
                success:false,
                message:"an error occured",
                data:error.message
            })
        }
       }

    }

}

const userProfileController = new usercontroller()

export default userProfileController