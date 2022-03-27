import { Router } from "express";
import { findAll, createOrder } from "../controllers/order";

const router = Router();

router.get("/order/list", findAll);
router.post("/order/add", createOrder);

export default router;