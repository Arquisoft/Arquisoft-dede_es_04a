import { LineAxisOutlined, VideoSettings } from '@mui/icons-material'
import React, { useEffect, useState} from 'react'
import * as productoService from './ProductosService'
import {Producto} from './Producto'
import ProductoItem from './ProductoItem'



const Productos = () => {

    
    const[productos, setProductos] = useState<Producto[]>([])
    
    const loadProductos = async ()=>{
        const res = await productoService.getProductos()
        console.log(res)
        let datos = res.data
        console.log(datos)
        setProductos(datos.products)
    }

    useEffect(()=>{
        loadProductos()
    }, [])


    return (
        
        <div>
            <h1 className='title'>PRODUCTOS</h1>
            <div className='productos'>
            {productos.map((producto) => {
                return <ProductoItem producto={producto} key={producto.name}/>
            })}
            </div>
        </div>

    )
}

export default Productos;
