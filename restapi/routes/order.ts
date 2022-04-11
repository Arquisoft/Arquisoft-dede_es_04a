import { Router } from "express";
import { findAll, createOrder, getShippingDetails } from "../controllers/order";

const router = Router();

router.get("/order/list", findAll);
router.post("/order/add", createOrder);
router.post("/order/getDetails", getShippingDetails); 

export default router;