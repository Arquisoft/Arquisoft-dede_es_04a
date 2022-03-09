import { Router } from "express";
import { signUp, login, findAll, findByUsername, deleteUser, updateUser } from "../controllers/user";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/user/list", findAll);
router.get("/user/:username", findByUsername);
router.get("/user/delete/:username", deleteUser);
router.post("/user/update/:id", updateUser);

export default router;