import axios from 'axios'

export const getProductos = async() => {
   return await axios.get(process.env.REACT_APP_API_URI || 'http://localhost:5000/api')
}