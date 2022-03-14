import axios from 'axios'

export const getProductos = async() => {
   return await axios.get("http://localhost:5000/api/product/list")
}