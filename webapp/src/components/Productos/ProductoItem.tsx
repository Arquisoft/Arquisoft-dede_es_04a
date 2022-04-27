import {Producto, Item} from '../../shared/sharedtypes'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {pad} from "@cloudinary/url-gen/actions/resize";
import {ReactSession} from 'react-client-session';
import { useNavigate } from 'react-router-dom';

interface Props{
  producto: Producto;
  cart: Item[];
}

const ProductoItem = ({producto, cart}: Props) => {
      
    const navigate = useNavigate();

    const addToCart = () =>{
        if(ReactSession.get("user")===undefined){
            navigate("/login");
            return;
        }

        var contains = false;
        cart.forEach( item => {
            if(item.producto.name===producto.name){
                item.num+=1;
                contains = true;    
            }
        });
        let num = 1;
        if(contains===false)
            cart.push({producto,num});
    }

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dede4a'
        }
    }); 

    const url = producto.urlImage
    const myImage = cld.image(url);

    
    
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
                
                <p className="price">{producto.price}€</p>
            </div>
            <div className="buttom">
                <button className="btn" onClick={addToCart}>
                    Añadir al carrito
                </button>
                <div>
                    <a href="#" className="btn">Vista</a>
                </div>
            </div>
      </div>
  )
}

export default ProductoItem