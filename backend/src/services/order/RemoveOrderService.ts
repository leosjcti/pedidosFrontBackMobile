import primsaClient from "../../prisma"

interface OrderRequest {
    order_id: string
}

class RemoveOrderService {
    async execute({ order_id }: OrderRequest) {

        const order = await primsaClient.order.delete({
            where: {
                id: order_id
            }
        })

        return order;
    }
}

export {RemoveOrderService}