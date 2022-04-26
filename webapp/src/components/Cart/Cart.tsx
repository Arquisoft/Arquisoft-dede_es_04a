import{ useState, useEffect} from 'react';
import { ReactSession } from 'react-client-session';
import CartItem from "./CartItem";
import { OrderType, Item} from "../../shared/sharedtypes";
import { useNavigate } from 'react-router-dom';

type Products = {
  products: Item[];
}

const Carrito = (props: Products) => {
  const [productos] = useState<Item[]>([]);
  const [price, setPrice] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(()=>{
    props.products.forEach(item => setPrice(price+ item.producto.price*item.num));
  }, [])

  const removeFromCart = (producto: Item)=>{
    productos.forEach( item => {
        if(item.producto.name===producto.producto.name){
            var pos = productos.indexOf(item)
            if(item.num-1 === 0){
                productos.splice(pos, 1);
            }else{
                item.num-=1;
            }
        }
    });
  }

  const createOrder = ()=>{
    let order : OrderType = {id:"" , user: ReactSession.get("user"), products: productos, price: price};
    ReactSession.set("order",order);
    navigate("/cart/address");
  }

  return (
    <div>
      <h1 className='title'>Mi carrito</h1>
      <div className='productos'>
        {props.products.map(item => 
          {
            return (<div>
                    <CartItem producto={item.producto} key={item.producto.name} num={item.num}/>
                    <div className="buttom">
                      <div> 
                        <a href="#" className="btn" onClick={() => removeFromCart(item)}>Eliminar</a>
                      </div>
                    </div>
                  </div>
        )})}
      </div>
      <h2>Total: {price}</h2>
      <button onClick={()=>createOrder()} disabled={props.products.length==0}>Finalizar pedido</button>
    </div>
  )
}

export default Carrito
