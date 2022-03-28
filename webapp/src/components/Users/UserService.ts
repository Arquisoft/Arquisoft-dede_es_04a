import axios from "axios";
import {User} from "./User";

const API = 'http://localhost:5000/api';

export const createNewUser = async (user: User) => {
    return await axios.post(`${API}/signup`, user);
};

export const login = async (user: User) => {
    return await axios.post(`${API}/login`, user);
};