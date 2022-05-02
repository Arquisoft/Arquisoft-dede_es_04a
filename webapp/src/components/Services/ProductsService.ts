import axios from 'axios'
import {Producto} from "../../shared/sharedtypes"

export const getProductos = async() => {
   return await axios.get((process.env.REACT_APP_API_URI ||'http://localhost:5000/api') + "/product/list")
}

export const addProducto = async (username: string, token: string, producto: Producto) => {
   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token, 'Username': username},
      body: JSON.stringify(producto)
    };
   try{
      return await fetch((process.env.REACT_APP_API_URI ||'http://localhost:5000/api') + '/product/add', requestOptions);
   }catch(error){

   }
};
   
export const deleteProducto = async (username: string, token: string, producto: Producto) => {
   try{
      return await axios.get((process.env.REACT_APP_API_URI ||'http://localhost:5000/api') + '/product/delete/' + producto._id + '?id=' + producto._id, {headers: { 'Content-Type': 'application/json', 'Authorization': token, 'Username': username}});
   }catch(error){
   }  
};
