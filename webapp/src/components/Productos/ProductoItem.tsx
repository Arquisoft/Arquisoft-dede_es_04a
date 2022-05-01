import {Producto, Item} from '../../shared/sharedtypes';
import {ReactSession} from 'react-client-session';
import { Link, useNavigate } from 'react-router-dom';

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

    const price = producto.basePrice + (producto.basePrice * producto.IVA);
    const url = "https://res.cloudinary.com/dede4a/image/upload/"+producto.urlImage+"?_a=AJADJWI0";

    const ruta = '/producto/' + producto._id;
    
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
                <button aria-label = "btnAñadir" className="btn" onClick={addToCart}>
                    Add to cart
                </button>
                <div>
                    <Link className="btn" type="button" to={ruta}>View</Link>
                </div>
            </div>
      </div>
  )
}

export default ProductoItem