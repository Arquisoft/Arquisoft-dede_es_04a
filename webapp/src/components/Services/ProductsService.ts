import axios from 'axios'
import {Producto} from "../../shared/sharedtypes"

export const getProductos = async() => {
   return await axios.get((process.env.REACT_APP_API_URI ||'http://localhost:5000/api') + "/product/list")
}

export const addProducto = async (username: string, token: string, producto: Producto) => {
   console.log("username")
   console.log(username)
   console.log("token")
   console.log(token)
   console.log("producto")
   console.log(producto)

  

   return await axios.post((process.env.REACT_APP_API_URI ||'http://localhost:5000/api') + '/product/add', producto, {headers:{'Authorization': token, 'Username': username}});
};

export const deleteProducto = async (producto: Producto) => {
   return await axios.post((process.env.REACT_APP_API_URI ||'http://localhost:5000/api') + '/product/delete/' + producto._id, producto);
};
