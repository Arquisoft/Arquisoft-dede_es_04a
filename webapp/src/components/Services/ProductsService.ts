import axios from 'axios'
import {Producto} from "../../shared/sharedtypes"

export const getProductos = async() => {
   return await axios.get((process.env.REACT_APP_API_URI ||'http://localhost:5000/api') + "/product/list")
}

export const addProducto = async (token: string, producto: Producto) => {
   return await axios.post((process.env.REACT_APP_API_URI ||'http://localhost:5000/api') + '/product/add', producto, {headers:{'Authorization': token}});
};

export const deleteProducto = async (producto: Producto) => {
   return await axios.post((process.env.REACT_APP_API_URI ||'http://localhost:5000/api') + '/product/delete/' + producto._id, producto);
};
