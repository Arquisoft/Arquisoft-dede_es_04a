import { Router } from "express";
import { findAll, productCreate, updateProduct, deleteProduct, findByCategory } from "../controllers/product";
import { validateRol, validateToken } from "../middlewares/validators";

const router = Router();

router.get("/product/list", findAll);
router.post("/product/add", validateToken, validateRol, productCreate);
router.post("/product/update/:id", validateToken, validateRol, updateProduct);
router.get("/product/delete/:id", validateToken, validateRol, deleteProduct);
router.get("/product/filter/:categories", findByCategory);

export default router;
