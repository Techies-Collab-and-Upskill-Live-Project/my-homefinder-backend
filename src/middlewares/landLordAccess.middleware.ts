import { NextFunction, Request, Response } from "express";

const landLordAccess = (req:Request,res:Response,next:NextFunction) => {
    //query database for role info;
    const role = 'landlord' // dummy data
    if(role != 'landlord'){
        res.status(404).json({
            success:false,
            message:'an error occured',
            data:"unauthorized access"
        })
    }
    next()
}

export default landLordAccess