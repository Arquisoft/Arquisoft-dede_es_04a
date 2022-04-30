import {Producto, Item} from '../../shared/sharedtypes'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {pad} from "@cloudinary/url-gen/actions/resize";
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
                    navigate('/');
                } catch (error) {
                    toast.error("Error at deleting");
                }
            
        }
    
    }


    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dede4a'
        }
    }); 

    const price = producto.basePrice + (producto.basePrice * producto.IVA)
    const url = producto.urlImage
    const myImage = cld.image(url);

    const ruta = '/productoDelete/' + producto._id;
    
    myImage
    .resize(pad().width(250).height(250))

  return (
    <div className="producto">
            <a href="#">
                <div className="producto__img">
                    <AdvancedImage cldImg={myImage} />
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