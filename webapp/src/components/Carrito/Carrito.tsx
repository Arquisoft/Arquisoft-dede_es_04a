import * as Icon from "react-bootstrap-icons"
import React, { useState, useContext, useEffect, ReactNode } from 'react'
import Image from "../../images/sergio.webp"
import DataContext from "./DataProvider"
import { Producto } from "../Productos/Producto"
import { ReactSession } from 'react-client-session';
import CartItem from "./CartItem";

type Item = {
  producto: Producto;
  num: number;
}

const Carrito = () => {
  const [productos, setProductos] = useState<Item[]>([]);

  const [map, setMap] = useState(new Map());

  const loadProductos = async () => {
    setMap(JSON.parse(ReactSession.get("cart") || '{}'));
    console.log(map);
    setProductos(Array.from(map.values()));
  }

  useEffect(() => {
    loadProductos()
  }, [])

  return (
    <div>
      <h1 className='title'>Mi carrito</h1>
      <div className='productos'>
        {productos.map(producto => {
          return <CartItem producto={producto.producto} num={producto.num}/>
        })}
      </div>
    </div>

  )
}

//return <CartItem producto={producto} key={producto.name} />
export default Carrito
