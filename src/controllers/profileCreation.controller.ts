import { Request,Response } from "express"
import userProfilesCreation from "../services/userProfileCreation.service"
import updateProfile from "../services/updateProfile.service"
const profileCreation = new userProfilesCreation
class usercontroller{
    public createProfile = async (req:Request,res:Response) => {
       try {
         const user = req.query.user
        const image = req.file?.path
        const body = req.body
        console.log(user)
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
        const createProfile = await profileCreation.createProfileLandlord(image,body)
        res.status(200).json({
            success:true,
            message:"landlord profile creation was successfully",
            data:createProfile
        })
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

    public updateProfile = async (req:Request,res:Response) => {
        const body = req.body
        const image = req.file?.path
        const userID = req.params.userId
        const user = req.query.user

        if(user == "tenant"){
            try {
                const updateTenantProfile = await updateProfile.updateTenantProfile(image,body,userID)
                console.log(updateTenantProfile)
                res.status(200).json({
                    success:true,
                    message:"user profile updated successfully",
                    data:updateProfile
                })
            } catch (error) {
                if(error){
                    res.status(404).json({
                        succes:false,
                        message:"an error occured, couldn't uodate tenant profile",
                        data:error
                    })
                }
            }
        }


        if(user == "landlord"){
            try {
                const updateLandlordProfile = await updateProfile.updateLandordProfile(image,body,userID)
                console.log(updateLandlordProfile)
                res.status(200).json({
                    success:true,
                    message:"user profile updated successfully",
                    data:updateProfile
                })
            } catch (error) {
                if(error){
                    res.status(404).json({
                        succes:false,
                        message:"an error occured, couldn't update landlord profile",
                        data:error
                    })
                }
            }
        }
    }

    // public getProfile = async ()

    
}

const userProfileController = new usercontroller()

export default userProfileController