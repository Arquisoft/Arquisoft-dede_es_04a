import {Producto} from '../../shared/sharedtypes';
import {ReactSession} from 'react-client-session';
import * as productService from '../Services/ProductsService';
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props{
  producto: Producto;
}

const ProductoDeleteItem = ({producto}: Props) => {


    const checkNotFound = (): boolean => {
        if (producto.name !== "")
            return true;
        return false;
    }

    const deleteFromBase = async () =>{
            
            if(!checkNotFound()){
                toast.error("The product does not exist");
            }
            else {
                try {
                    const user = ReactSession.get("user");
                    await productService.deleteProducto(user.username, user.token, producto);
                    toast.success("Succesfully deleted");
                    window.location.assign("/");
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
            <a href="/deleteProduct#">
                <div className="producto__img">
                    <img  alt='' src={url}></img>
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