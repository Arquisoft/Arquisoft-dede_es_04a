import { Router } from "express";
import { findAll, createOrder, getShippingDetails, findById, findByUsername } from "../controllers/order";
import { validateRol, validateToken } from "../middlewares/validators";

const router = Router();

router.get("/order/list", validateToken, validateRol, findAll);
router.get("/order/:id", validateToken, validateRol, findById);
router.get("/order/user/:email", validateToken, findByUsername);
router.post("/order/add" ,validateToken, createOrder);
router.post("/order/get-shipping-cost", validateToken, getShippingDetails); 

export default router;