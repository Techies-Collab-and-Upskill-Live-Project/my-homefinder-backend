import { prisma } from "../prisma/prisma"

class Search {
    
    public searchProperties = async (query:string) => {
        if(!query){throw new Error("query not available")}
        const queryResult = await prisma.property.findMany({
            where: {
                OR : [
                    {city: {contains:query, mode:'insensitive'}},
                    {state: {contains:query, mode:'insensitive'}}
                ]
            }
        })

        if(queryResult.length == 0){
            return []
        }

        return queryResult

    }
}

const searchService = new Search()
export default searchService