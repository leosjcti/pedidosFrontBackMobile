import primsaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class SendOrderService {
    async execute( {order_id}: OrderRequest) {
        const order = await primsaClient.order.update({
            where: {
                id: order_id
            },
            data: {
                draft: false
            }
        })

        return order;
    }
}

export {SendOrderService}