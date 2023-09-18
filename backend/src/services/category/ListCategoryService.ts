import primsaClient from "../../prisma";

interface CategoryRequest {
    name: string
}


class ListCategoryService {
    async execute() {
        
        const category = await primsaClient.category.findMany({
            select: {
                id: true,
                name: true
            }
        })

       
        return category;
    }
}
export {ListCategoryService}