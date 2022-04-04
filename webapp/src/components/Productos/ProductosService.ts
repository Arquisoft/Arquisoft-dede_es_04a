import axios from 'axios'
import {Producto} from "./Producto"

export const getProductos = async() => {
   return await axios.get((process.env.REACT_APP_API_URI ||'http://localhost:5000/api') + "/product/list")
}

export const addProducto = async (producto: Producto) => {
   return await axios.post((process.env.REACT_APP_API_URI ||'http://localhost:5000/api') + '/product/add', producto);
};
