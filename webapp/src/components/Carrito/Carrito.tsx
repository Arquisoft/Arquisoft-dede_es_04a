import{ useState, useEffect} from 'react'
import { Producto } from "../Productos/Producto"
import { ReactSession } from 'react-client-session';
import CartItem from "./CartItem";

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
    console.log(map);
    setProductos(Array.from(map.values()));
  }

  useEffect(() => {
    loadProductos();
  }, [])

  return (
    <div>
      <h1 className='title'>Mi carrito</h1>
      <div className='productos'>
        {props.products.map(item => {
          return <CartItem producto={item.producto} num={item.num}/>
        })}
      </div>
    </div>

  )
}

//return <CartItem producto={producto} key={producto.name} />
export default Carrito
