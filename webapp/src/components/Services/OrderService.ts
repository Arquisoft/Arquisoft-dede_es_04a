import axios from "axios";
import { User, AddressType} from "../../shared/sharedtypes";

const API = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

export const createNewOrder = async (products: Map<String,number>,address:AddressType,user:string,shippingCost:number,totalPrice:number) => {
    return await axios.post(`${API}/order/add`, {products,address,user,shippingCost,totalPrice});
};

export const getOrdersOf = async (user: User) => {
    return await axios.post(`${API}/order/user/:email`, user);
};

export const getOrder = async (id: string) => {
    return await axios.post(`${API}/order/:id`, id);
};
