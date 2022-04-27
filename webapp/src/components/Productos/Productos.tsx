import { useEffect, useState} from 'react'
import * as productService from '../Services/ProductsService'
import {Producto, Item} from '../../shared/sharedtypes'
import ProductoItem from './ProductoItem'

type Products = {
    products: Item[];
}

const Productos = (props: Products) => {
    
    const[productos, setProductos] = useState<Producto[]>([])
    
    const loadProductos = async ()=>{
        const res = await productService.getProductos();
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
