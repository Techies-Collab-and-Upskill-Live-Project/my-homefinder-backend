// service for updating profiles
import { prisma } from '../prisma/prisma';



class updateProfiles {

    public async updateTenantProfile(image:any,body:any,userId:string){
        const {fullName,phoneNumber,street,city,state,NIN} = body
        const update:any = {
            ...(image && {profileImage:image}),
            ...(fullName && {fullName: fullName}),
            ...(phoneNumber && {phoneNumber: phoneNumber}),
            ...(street && {street: street}),
            ...(city && {city: city}),
            ...(state && {state: state}),
            ...(NIN && {NIN: NIN}),
        }
        const updatePrisma = await prisma.tenantProfile.updateMany({
            where:{
                userId : userId
            },
            data:update
        })
        console.log(updatePrisma)
        return updatePrisma
    }

    public async updateLandordProfile(){
        //updating landlord profile logic
    }
}

const updateProfile = new updateProfiles()
export default updateProfile