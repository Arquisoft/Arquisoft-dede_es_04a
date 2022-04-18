import{ useState, useEffect} from 'react';
import { ReactSession } from 'react-client-session';
import CartItem from "./CartItem";
import { OrderType, Item} from "../../shared/sharedtypes";
import * as orderService from '../Order/OrderService';


type Products = {
  products: Item[];
}

const Carrito = (props: Products) => {
  const [productos, setProductos] = useState<Item[]>([]);

  const [map, setMap] = useState(new Map());

  const loadProductos = async () => {
    setMap(JSON.parse(ReactSession.get("cart") || '{}'));
    console.log(map);
    setProductos(Array.from(map.values()));
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
    console.log(productos);
  }

  useEffect(() => {
    loadProductos();
  }, [])

  const createOrder = ()=>{
    let id = Math.random()*10000;
    let order : OrderType = {id:String(id) , owner: ReactSession.get("user"), products: productos, price: 0};
    orderService.createNewOrder(order);
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
