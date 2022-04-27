import { useState, useEffect } from 'react'
import { Producto } from "../Productos/Producto"
import { ReactSession } from 'react-client-session';
import CartItem from "./CartItem";
import Productos from '../Productos/Productos';

export type Item = {
  producto: Producto;
  num: number;
}

type CarritoProps = {
  items: Item[];
  onCartUpdate: (items: Item[]) => void;
}

const Carrito = ({ items, onCartUpdate }: CarritoProps) => {

  // const [items, setItems] = useState<Item[]>([]);

  // const loadProductos = () => {
  //   // const map = JSON.parse(ReactSession.get("cart") || '{}');
  //   // console.log("lo que llega");
  //   // console.log(map);
  //   setItems(ReactSession.get("cart") || '[]');
  // }

  const removeFromCart = (item: Item) => {
    const newCart = [...items];

    const cartItem = newCart.find(item => item.producto._id === item.producto._id);

    if (item) {
      item.num -= 1;

      if (item.num === 0) {
        newCart.splice(newCart.indexOf(item), 1);
      }

      onCartUpdate(newCart);
    }
  }

  const increaseItemUnits = (item: Item) => {
    const newCart = [...items];

    const cartItem = newCart.find(item => item.producto._id === item.producto._id);

    if (item) {
      item.num += 1;

      onCartUpdate(newCart);
    }
  }

  // useEffect(() => {
  //   loadProductos();
  // }, [])

  return (
    <div>
      <h1 className='title'>Mi carrito</h1>
      <div className='productos'>
        {items && items.map(item => {
          return (<div key={item.producto.name}>
            <CartItem producto={item.producto} num={item.num} />
            <div className="buttom">
              <div>
                <a href="#" className="btn" onClick={() => removeFromCart(item)}>Eliminar</a>
              </div>
            </div>
            <div className="buttom">
              <div>
                <a href="#" className="btn" onClick={() => increaseItemUnits(item)}>Añadir</a>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}

//return <CartItem producto={producto} key={producto.name} />
export default Carrito
