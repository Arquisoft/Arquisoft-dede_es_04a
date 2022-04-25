import { Router } from "express";
import { signUp, login, findAll, findByUsername, deleteUser, updateUser, readAddress } from "../controllers/user";
import { validateRol, validateSignUp, validateToken } from "../middlewares/validators";

const router = Router();

router.post("/signup", validateSignUp, signUp);
router.post("/login", login);
router.get("/user/list", validateToken, validateRol, findAll);
router.get("/user/:username", validateToken, validateRol, findByUsername);
router.get("/user/delete/:username", validateToken, validateRol, deleteUser);
router.post("/user/update/:id", validateToken, validateRol, updateUser);
router.post("/user/pod", validateToken, readAddress);

export default router;
