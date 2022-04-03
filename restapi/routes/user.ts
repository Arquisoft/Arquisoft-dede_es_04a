import { Router } from "express";
import { signUp, login, findAll, findByUsername, deleteUser, updateUser, readAddress } from "../controllers/user";
import { validateSignUp, validateToken } from "../middlewares/validators";

const router = Router();

router.post("/signup", validateSignUp, signUp);
router.post("/login", login);
router.get("/user/list", validateToken, findAll);
router.get("/user/:username", validateToken, findByUsername);
router.get("/user/delete/:username", validateToken, deleteUser);
router.post("/user/update/:id", validateToken, updateUser);
router.post("/user/pod", validateToken, readAddress);

export default router;