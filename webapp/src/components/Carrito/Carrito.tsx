import{ useState, useEffect} from 'react'
import { Producto } from "../Productos/Producto"
import { ReactSession } from 'react-client-session';
import CartItem from "./CartItem";
import Productos from '../Productos/Productos';

export type Item = {
  producto: Producto;
  num: number;
}

type Products = {
  products: Item[];
}

const Carrito = (props: Products) => {
  const [productos, setProductos] = useState<Item[]>([]);

  const [map, setMap] = useState(new Map());

  const loadProductos = async () => {
    setMap(JSON.parse(ReactSession.get("cart") || '{}'));
    console.log("lo que llega");
    console.log(map);
    setProductos(Array.from(map.values()));
  }

  const removeFromCart = (producto: Item)=>{
    productos.forEach( item => {
        if(item.producto.name==producto.producto.name){
            var pos = productos.indexOf(item)
            if(item.num-1 == 0){
                setProductos(Array.from(productos.splice(pos,0)))
            }else{
                productos[pos].num-=1;
                
            }
        }
    });
    console.log(productos);
  }

  useEffect(() => {
    loadProductos();
  }, [])

  return (
    <div>
      <h1 className='title'>Mi carrito</h1>
      <div className='productos'>
        {props.products.map(item => 
          {return (<div key={item.producto.name}>
                    <CartItem producto={item.producto} num={item.num}/>
                    <div className="buttom">
                      <div> 
                        <a href="#" className="btn" onClick={() => removeFromCart(item)}>Eliminar</a>
                      </div>
                    </div>
                  </div>
        )})}
      </div>
    </div>
  )
}

//return <CartItem producto={producto} key={producto.name} />
export default Carrito
