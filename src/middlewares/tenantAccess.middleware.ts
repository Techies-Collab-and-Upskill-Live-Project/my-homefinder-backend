import { NextFunction, Request, Response } from "express";

const tenantAccess = (req:Request,res:Response,next:NextFunction) => {
    //query database for role info;
    const role = 'tenants' // dummy data
    if(role != 'tenants'){
        res.status(404).json({
            success:false,
            message:'an error occured',
            data:"unauthorized access"
        })
    }
    next()
}

export default tenantAccess