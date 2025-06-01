import cloudinary from "../config/uploadProfileImageCloudinary"
import fs from 'fs'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
class userProfilesCreation{
    constructor(){

    }

    public login = () => {
        try {
            
        } catch (error) {
            
        }
    }


    
    public async createProfileTenant(image:string,body:any){
        const {fullName,phoneNumber,street,city,state,NIN} = body
        //upload to cloudinary
        if(!image){throw new Error("user profile is required")}


        const uploadedImg = await cloudinary.uploader.upload(image,{    
            folder:'uploads'
        })
    
        const imageUrl = uploadedImg.secure_url

        fs.unlinkSync(image)


        if(!fullName || fullName == ''){throw new Error('fullname is required')}
        if(!phoneNumber || phoneNumber == ''){throw new Error('fullname is required')}
        if(!street || street == ''){throw new Error('fullname is required')}
        if(!city || city == ''){throw new Error('fullname is required')}
        if(!state || state == ''){throw new Error('fullname is required')}
        if(!NIN || NIN == ''){throw new Error('fullname is required')}
        // upload to psql database

        return 'succesfully created user profile'
    }

    public async createProfileLandlord(image:string,body:any){
        const {typeOfHouse,numberOfRooms,otherInfo,street,preferences,NIN,driversLicense,BVN} = body
        //upload to cloudinary
        if(!image){throw new Error("user profile is required")}


        const uploadedImg = await cloudinary.uploader.upload(image,{
            folder:'uploads'
        })
    
        const imageUrl = uploadedImg.secure_url

        fs.unlinkSync(image)


        if(!typeOfHouse || typeOfHouse == ''){throw new Error('Type Of House is required')}
        if(!numberOfRooms || numberOfRooms == ''){throw new Error('fullname is required')}
        if(!otherInfo || otherInfo == ''){throw new Error('fullname is required')}
        if(!street || street == ''){throw new Error('fullname is required')}
        if(!preferences || preferences == ''){throw new Error('fullname is required')}
        if(!NIN || NIN == ''){throw new Error('fullname is required')}
        if(!driversLicense || driversLicense == ''){throw new Error('fullname is required')}
        if(!BVN || BVN == ''){throw new Error('fullname is required')}
        // upload to psql database
        return 'succesfully created user profile'
    }

    
}

const profileCreation = new userProfilesCreation()

export default profileCreation