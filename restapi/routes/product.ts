import { Router } from "express";
import { findAll, productCreate, updateProduct, deleteProduct, findByCategory } from "../controllers/product";
import { validateToken } from "../middlewares/validators";

const router = Router();

router.get("/product/list", findAll);
router.post("/product/add", validateToken,  productCreate);
router.post("/product/update/:id", validateToken, updateProduct);
router.get("/product/delete/:id", validateToken, deleteProduct);
router.get("/product/filter/:categories", validateToken, findByCategory);

export default router;