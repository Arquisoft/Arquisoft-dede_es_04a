import { Router } from "express";
import "./database";
import user from "./routes/user";

const api: Router = Router();

api.use(user);

export default api;