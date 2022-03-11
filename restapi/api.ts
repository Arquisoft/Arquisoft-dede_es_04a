import { Router } from "express";
import "./database";
import "./cloudinary"
import user from "./routes/user";
import product from "./routes/product";
const api: Router = Router();

api.use(user);
api.use(product);

export default api;