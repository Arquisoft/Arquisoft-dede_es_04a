import {Producto} from '../../shared/sharedtypes';
import {ReactSession} from 'react-client-session';
import * as productService from '../Services/ProductsService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props{
  producto: Producto;
}

const ProductoDeleteItem = ({producto}: Props) => {
      
    const navigate = useNavigate();


    const checkNotFound = (): boolean => {
        if (producto.name !== "")
            return true;
        return false;
    }

    const deleteFromBase = async () =>{
            console.log("nombre que llega")
            
            if(!checkNotFound()){
                toast.error("The product does not exist");
            }
            else {
                console.log("paso campos")
                try {
                    const user = ReactSession.get("user");
                    console.log("El producto que llega");
                    console.log(producto);
                    await productService.deleteProducto(user.username, user.token, producto);
                    toast.success("Succesfully deleted");
                    window.location.reload();
                } catch (error) {
                    toast.error("Error at deleting");
                }
            
        }
    
    }

    const price = producto.basePrice + (producto.basePrice * producto.IVA)
    const url = "https://res.cloudinary.com/dede4a/image/upload/"+producto.urlImage+"?_a=AJADJWI0";

    const ruta = '/productoDelete/' + producto._id;

  return (
    <div className="producto">
            <a href="#">
                <div className="producto__img">
                    <img src={url}></img>
                </div>
            </a>
            <div className="producto__footer">
                <h1>{producto.name}</h1>
                
                <p className="price">{price.toFixed(2)}$</p>
            </div>
            <div className="buttom">
                <button className="btnDelete" onClick={deleteFromBase}>
                    Delete
                </button>
                <div>
                    <Link className="btn" type="button" to={ruta}>View</Link>
                </div>
            </div>
      </div>
  )
}

export default ProductoDeleteItem