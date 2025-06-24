import { appError } from "../utils/appError"
import bcrypt from "bcryptjs"
import { hashPassword } from "../utils/hash.util"
import { PrismaClient } from "../generated/prisma"
import {prisma} from "../prisma/prisma"
 interface body {
        name:string,
        email:string,
        password:string
    }
export class AdminAuth {
    
    constructor(){
    }
   

    async signUp(body :body ){
        const {name,email,password} = body
         if(!name || name == ""){throw new appError(400, "bad input")}
        if(!email || email == ""){throw new appError(400, "bad input")}
        if(!password || password == ""){throw new appError(400, "bad input")}

        // check if user exists
        const existingUser = await prisma.admin.findFirst({
            where:{email:email}
        })
        if(existingUser){throw new appError(409,"user already exist")}
        const hashedPassword = await hashPassword(password)
        const dbResponse = await prisma.admin.create({
            data:{
                name:name,
                email:email,
                password:hashedPassword
            }
        })

        return dbResponse
    }
}

