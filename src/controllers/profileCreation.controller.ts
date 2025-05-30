import { Request,Response } from "express"
class usercontroller{
    public createProfile = (req:Request,res:Response) => {
        const user = req.query.user
        const image = req.file
        const body = req.body
    }

}