import { PrismaClient } from "../../generated/prisma"
class Search {
    prisma : PrismaClient
    constructor(){
        this.prisma = new PrismaClient()
    }
    public searchProperties = async (query:string) => {
        if(!query){throw new Error("query not available")}
        const queryResult = await this.prisma.property.findMany({
            where: {
                OR : [
                    {city: {contains:query, mode:'insensitive'}},
                    {state: {contains:query, mode:'insensitive'}}
                ]
            }
        })

        if(queryResult.length == 0){
            throw new Error("property that matches not found")
        }

        return queryResult

    }
}

const searchService = new Search()
export default searchService