import { Router } from "express";
import { signUp, login, findAll, findByUsername, deleteUser, updateUser, readAddress } from "../controllers/user";
import { validateSignUp, validateToken } from "../middlewares/validators";

const router = Router();

router.post("/signup", validateSignUp, signUp);
router.post("/login", login);
router.get("/user/list", findAll);
router.get("/user/:username", findByUsername);
router.get("/user/delete/:username", deleteUser);
router.post("/user/update/:id", updateUser);
router.post("/user/pod", readAddress);

export default router;