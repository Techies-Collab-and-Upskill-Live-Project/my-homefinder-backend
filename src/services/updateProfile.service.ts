// service for updating profiles
import { PrismaClient } from "../../generated/prisma";
class updateProfiles {
    public prisma : PrismaClient
    constructor () {
        this.prisma = new PrismaClient()
    }

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
        const updatePrisma = await this.prisma.tenantProfile.updateMany({
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