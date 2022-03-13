import { LineAxisOutlined, VideoSettings } from '@mui/icons-material'
import React, { useEffect, useState} from 'react'
import * as productoService from './ProductosService'
import {Producto} from './Producto'
import ProductoItem from './ProductoItem'



const Productos = () => {

    const[productos, setProductos] = useState<Producto[]>([])

    const loadProductos = async ()=>{
        const res = await productoService.getProductos()
        setProductos(res.data)
    }

    useEffect(()=>{
        loadProductos()
    }, [])


    return (
        <div>
            {productos.map((producto) => {
                return <ProductoItem producto={producto}/>
            })}
        </div>

    )
}