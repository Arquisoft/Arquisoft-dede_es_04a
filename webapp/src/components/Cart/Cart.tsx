import{ useState, useEffect} from 'react';
import { ReactSession } from 'react-client-session';
import CartItem from "./CartItem";
import { OrderType, Item} from "../../shared/sharedtypes";
import { useNavigate } from 'react-router-dom';

type Products = {
  products: Item[];
}

const Carrito = (props: Products) => {
  const [productos, setProductos] = useState<Item[]>([]);

  const navigate = useNavigate();

  const loadProductos = async () => {
    setProductos(ReactSession.get("cart"));
  }

  const removeFromCart = (producto: Item)=>{
    productos.forEach( item => {
        if(item.producto.name===producto.producto.name){
            var pos = productos.indexOf(item)
            if(item.num-1 === 0){
                productos.splice(pos, 1)
            }else{
                item.num-=1;
            }
        }
    });
  }

  useEffect(() => {
    loadProductos();
  }, [])

  const createOrder = ()=>{
    let id = Math.random()*10000;
    let order : OrderType = {id:String(id) , owner: ReactSession.get("user"), products: productos, price: 0};
    ReactSession.set("order",order);
    navigate("/cart/payment");
  }

  return (
    <div>
      <h1 className='title'>Mi carrito</h1>
      <div className='productos'>
        {props.products.map(item => 
          {return (<div>
                    <CartItem producto={item.producto} num={item.num}/>
                    <div className="buttom">
                      <div> 
                        <a href="#" className="btn" onClick={() => removeFromCart(item)}>Eliminar</a>
                      </div>
                    </div>
                  </div>
        )})}
      </div>
      <button onClick={()=>createOrder()}>Finalizar pedido</button>
    </div>
  )
}

export default Carrito
