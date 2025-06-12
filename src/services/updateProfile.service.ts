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

    public async updateLandordProfile(image:any,body:any,userId:string){
        const {typeOfHouse,numberOfRooms,otherInfo,street,preference,NIN,driversLicense,BVN} = body
        console.log(body)
        const update:any = {
            ...(image && {profileImage:image}),
            ...(typeOfHouse && {typeOfHouse: typeOfHouse}),
            ...(numberOfRooms && {numberOfRooms: numberOfRooms}),
            ...(otherInfo && {otherInfo: otherInfo}),
            ...(street && {street: street}),
            ...(preference && {preference: preference}),
            ...(NIN && {NIN: NIN}),
            ...(driversLicense && {driversLicense: driversLicense}),
            ...(BVN && {BVN: BVN}),
        }
        const updatePrisma = await this.prisma.landLordProfile.updateMany({
            where:{
                userId : userId
            },
            data:update
        })
        return updatePrisma
    }
}

const updateProfile = new updateProfiles()
export default updateProfile