import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient()

const tenantAccess = async (req:Request,res:Response,next:NextFunction) => {
    try {
        //query database for role info;
    const userId = req.params.userId
    const checkUser = await prisma.user.findFirst({
        where:{id:userId}
    })
    if(checkUser == null){
        throw new Error("user doesn't exist")
    }
    const roleId = checkUser?.roleId // dummy data
    const roleResponse = await prisma.role.findFirst({
        where:{id:roleId}
    })
    if(roleResponse == null){
        throw new Error("role has not been assigned")
    }
    const role  = roleResponse.name
    
    if(role != 'tenant'){
        throw new Error("unauthorized access")
    }
    } catch (error) {
        res.status(404).json({
            success:false,
            message:'an error occured',
            data:error
        })
    }
    next()
}

export default tenantAccess