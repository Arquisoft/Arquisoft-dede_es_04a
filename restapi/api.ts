import { Router } from "express";
import "./database";
import user from "./routes/user";
import product from "./routes/product";
import order from "./routes/order";

const api: Router = Router();

api.use(user);
api.use(product);
api.use(order);

export default api;