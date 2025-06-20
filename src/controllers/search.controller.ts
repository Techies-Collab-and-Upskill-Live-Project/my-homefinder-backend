import {Response} from "express"
import searchService from "../services/searchProperties.service"
import {RequestWithUser} from "../interfaces/auth.interface"

class searchController {
    public searchFunction = async (req: RequestWithUser, res: Response) => {
        try {
            const query = req.query.search as string
            const propertyResult = await searchService.searchProperties(query)
            res.status(200).json({
                success: true,
                message: "fetched property successfully",
                data: propertyResult
            })
        } catch (error: any) {
            if (error) {
                res.status(404).json({
                    success: false,
                    message: "an error occured",
                    data: error.message
                })
            }
        }
    }
}

const search = new searchController()
export default search