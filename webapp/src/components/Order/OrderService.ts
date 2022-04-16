import axios from "axios";
import { User, OrderType} from "../../shared/sharedtypes";

const API = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

export const createNewOrder = async (order: OrderType) => {
    return await axios.post(`${API}/order/add`, order);
};

export const getOrdersOf = async (user: User) => {
    return await axios.post(`${API}/order/list`, user);
};

export const getOrder = async (id: string) => {
    return await axios.post(`${API}/order/details`, id);
};
