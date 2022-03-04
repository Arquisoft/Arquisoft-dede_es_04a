import express, { Request, Response, Router } from 'express';
import './database';
import { signUp, login } from './controllers/user';

const api:Router = express.Router()

api.post("/signup", signUp);

api.post("/login", login);

export default api;