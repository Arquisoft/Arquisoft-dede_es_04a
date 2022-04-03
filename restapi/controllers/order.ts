import { Request, Response } from "express";
import Order from "../models/order";

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    const orders = await Order.find();
    console.log("hhsf")
    return res.status(200).json({orders});
};

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.products || !req.body.address || !req.body.user || !req.body.shippingCost || !req.body.totalPrice)
        return res.status(400).json({ msg: "Please, complete all the fields" });
    
    const newOrder = new Order(req.body);
    newOrder.save();
    
    return res.status(200).json({ newOrder });
};
