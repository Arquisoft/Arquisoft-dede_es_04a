import { Router } from "express";
import { findAll, productCreate, updateProduct, deleteProduct, findByCategory } from "../controllers/product";

const router = Router();

router.post("/product/list", findAll);
router.post("/product/add", productCreate);
router.post("/product/update/:id", updateProduct);
router.get("/product/delete/:id", deleteProduct);
router.post("/product/findByCategory/:category", findByCategory);

export default router;