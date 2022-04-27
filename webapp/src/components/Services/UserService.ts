import axios from "axios";
import {User} from "../../shared/sharedtypes";

const API = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

export const createNewUser = async (user: User) => {
    return await axios.post(`${API}/signup`, user);
};

export const login = async (user: User) => {
    return await axios.post(`${API}/login`, user);
};

export const getAddress = async (token:string,pod: string) => {
    return await axios.post(`${API}/user/pod`,{pod}, {headers:{'Authorization': token}});
};