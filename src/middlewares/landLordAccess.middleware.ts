import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import { RequestWithUser } from "../interfaces/auth.interface";


const landLordAccess = async (req:RequestWithUser,res:Response,next:NextFunction) => {
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
    
    if(role != 'Landlord'){
        throw new Error("unauthorized access")
    }
    req.user.role = role
    } catch (error:any) {
        res.status(401).json({
            success:false,
            message:'an error occured',
            data:error.message
        })
    }
    next()
}

export default landLordAccess