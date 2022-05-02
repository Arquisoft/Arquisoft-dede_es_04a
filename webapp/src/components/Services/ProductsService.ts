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
      console.log('That did not go well.')
   }
};
   
export const deleteProducto = async (username: string, token: string, producto: Producto) => {
   var data = { 'id': producto._id};
   const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': token, 'Username': username},
      body: JSON.stringify(producto),
      params: data
    };
   try{
      return await axios.get((process.env.REACT_APP_API_URI ||'http://localhost:5000/api') + '/product/delete/' + producto._id + '?id=' + producto._id, {headers: { 'Content-Type': 'application/json', 'Authorization': token, 'Username': username}});
   }catch(error){
      console.log('That did not go well.')
   }  
};
