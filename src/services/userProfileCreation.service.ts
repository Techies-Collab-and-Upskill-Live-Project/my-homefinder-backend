import bcryptjs from "bcryptjs"
class userProfilesCreation{
    constructor(){

    }

    public login = () => {
        try {
            
        } catch (error) {
            
        }
    }


    
    public createProfileTenant(image:Express.Multer.File,body:any){
        const {fullName,phoneNumber,street,city,state,NIN} = body
        //upload to cloudinary
        if(!image){throw new Error("user profile is required")}
        const uploadedImgLink = '...' // imae link returned from cloudinary
        if(!fullName || fullName == ''){throw new Error('fullname is required')}
        if(!phoneNumber || phoneNumber == ''){throw new Error('fullname is required')}
        if(!street || street == ''){throw new Error('fullname is required')}
        if(!city || city == ''){throw new Error('fullname is required')}
        if(!state || state == ''){throw new Error('fullname is required')}
        if(!NIN || NIN == ''){throw new Error('fullname is required')}

    }
}

const profileCreation = new userProfilesCreation()

export default profileCreation