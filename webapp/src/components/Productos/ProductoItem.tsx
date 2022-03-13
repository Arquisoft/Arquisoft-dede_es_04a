import React from 'react'
import {Producto} from './Producto'

interface Props{
  producto: Producto
}

const ProductoItem = ({producto}: Props) => {
  return (
    <div>
      <h1>{producto.name}</h1>
      <h2>{producto.categoria}</h2>
    </div>
  )
}

export default ProductoItem