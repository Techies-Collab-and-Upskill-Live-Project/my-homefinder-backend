import { PrismaClient } from "../../generated/prisma"
const prisma = new PrismaClient()
class getProfile {
    prisma : PrismaClient
    constructor() {
        this.prisma = prisma
    }
   public async getTenantProfie(userID:string){
        // check if user exists
        const checkUser = await prisma.user.findUnique({
            where: {id: userID}
        })
        if(checkUser == null){
            throw new Error("user does not exsist")
        }
        // get tenant profile
        const tenantProfile = await prisma.tenantProfile.findFirst({
            where:{userId:userID}
        })

        return tenantProfile
    }

    public async getLandlordProfie(userID:string){
        // check if user exists
        const checkUser = await prisma.user.findUnique({
            where: {id: userID}
        })
        if(checkUser == null){
            throw new Error("user does not exsist")
        }
        // get tenant profile
        const landlordProfile = await prisma.landLordProfile.findMany({
            where:{userId:userID}
        })

        return landlordProfile
    }
}

const getProfileInstance = new getProfile()
export default getProfileInstance