import primsaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
}

class RemoveItemByOrderService {
    async execute({ order_id } : ItemRequest) {
        
        const order = await primsaClient.item.deleteMany({
            where: {
                order_id: order_id
            }
        }) 

        return order;
    }
}

export { RemoveItemByOrderService }