import { Request, Response } from "express"
import { RemoveItemByOrderService } from "../../services/order/RemoveItemByOrderService";

class RemoveItemByOrderController {
    async handle(req: Request, res: Response) {
        
        const order_id = req.query.order_id as string

        const removeItemByOrderService = new RemoveItemByOrderService();

        const order = await removeItemByOrderService.execute({
            order_id,
        });
        return res.json(order);     
    }
}
export {RemoveItemByOrderController}