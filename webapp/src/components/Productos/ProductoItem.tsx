import React from 'react'
import {Producto} from './Producto'

interface Props{
  producto: Producto
}

const ProductoItem = ({producto}: Props) => {
  return (
    <div className="producto">
            <a href="#">
                <div className="producto__img">
                    <img src="https://i.imgur.com/NoxQdPm.jpg" alt="" />
                </div>
            </a>
            <div className="producto__footer">
                <h1>{producto.name}</h1>
                <p>{producto.description}</p>
                <p className="price">No tiene precio</p>
            </div>
            <div className="buttom">
                <button className="btn">
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