import { useEffect, useState} from 'react'
import * as productoService from './ProductosService'
import {Producto} from './Producto'
import ProductoItem from './ProductoItem'
import { Item } from '../Carrito/Carrito'

type Products = {
    products: Item[];
}

const Productos = (props: Products) => {
    
    const[productos, setProductos] = useState<Producto[]>([])
    
    const loadProductos = async ()=>{
        const res = await productoService.getProductos();
        let datos = res.data;
        setProductos(datos.products);
    }

    useEffect(()=>{
        loadProductos()
    }, [])


    return (
        <div>
            <h1 className='title'>PRODUCTOS</h1>
            <div className='productos'>
            {productos.map((producto) => {
                return <ProductoItem producto={producto} key={producto.name} cart={props.products}/>
            })}
            </div>
        </div>

    )
}

export default Productos;
