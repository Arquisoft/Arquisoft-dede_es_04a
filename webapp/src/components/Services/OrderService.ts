import axios from "axios";
import { User, AddressType} from "../../shared/sharedtypes";

const API = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

export const createNewOrder = async (productos: Map<String,number>,address:AddressType,user:string,shippingCost:number,totalPrice:string,orderDate:Date,receptionDate:Date,status:string,token:string) => {
    var products = Object.fromEntries(productos);
    return await axios.post(`${API}/order/add`, {products,address,user,shippingCost,totalPrice,orderDate,receptionDate,status}, {headers:{'Authorization': token}});
};

export const getOrdersOf = async (u: User) => {
    let email = u.email!;
    let token = u.token!;
    return await axios.get(`${API}/order/user/`+email, {headers:{'Authorization': token}});
};

export const getOrder = async (id: string, token:string) => {
    return await axios.get(`${API}/order/`+id, {headers:{'Authorization': token}});
};

export const getShippingDetails = async (user:string, address: AddressType, token:string) => {
    return await axios.post(`${API}/order/get-shipping-cost`, {user,address}, {headers:{'Authorization': token}});
};
