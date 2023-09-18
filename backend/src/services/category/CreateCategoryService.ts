import primsaClient from "../../prisma";

interface CategoryRequest {
    name: string
}


class CreateCategoryService {
    async execute({ name }) {
        
        if(name === '') {
            throw new Error('Invalid name');
        }

        //Verificar se categoria já existe
        const categoryAlreadyExists = await primsaClient.category.findFirst({
            where: {
                name: name
            }
        })

        if(categoryAlreadyExists) {
            throw new Error("Category already exists")
        }


        const category = await primsaClient.category.create({
            data: {
                name: name
            }, select: {
                id: true,
                name: true
            }
        })
        return category;
    }
}
export {CreateCategoryService}