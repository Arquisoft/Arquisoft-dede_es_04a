import { Router } from "express";
import { findAll, createOrder, getShippingDetails, findById, findByUsername } from "../controllers/order";

const router = Router();

router.get("/order/list", findAll);
router.get("/order/:id", findById);
router.get("/order/user/:email", findByUsername);
router.post("/order/add", createOrder);
router.post("/order/getDetails", getShippingDetails); 

export default router;