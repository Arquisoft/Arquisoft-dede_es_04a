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
            <div className='productos'>PRODUCTOS</div>
            {productos.map((producto) => {
                return <ProductoItem producto={producto} key={producto.name}/>
            })}
        </div>

    )
}

export default Productos;