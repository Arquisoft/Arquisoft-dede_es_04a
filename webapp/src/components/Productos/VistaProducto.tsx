import { useEffect, useState, useRef } from 'react'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { pad } from "@cloudinary/url-gen/actions/resize";
import { Producto } from './Producto'
import {useParams} from "react-router-dom";
import * as productoService from './ProductosService';
import { ConstructionOutlined } from '@mui/icons-material';

type Props = {
    productName: string
    productDesc: string
    productPrice: string
    productImage: string
}


export const VistaProducto = () => {


    const [productos, setProductos] = useState<Producto[]>([])
    const [detalle, setDetalle] = useState<Producto>()


    const params = useParams();
    console.log("parametros")
    console.log(params);
    

    const loadProductos = async () => {
        const res = await productoService.getProductos()
        console.log(res)
        let datos = res.data
        console.log(datos)
        setProductos(datos.products)   
    }

    useEffect(() => {
        loadProductos()
    }, [])

    console.log("productos")
    console.log(productos);

    useEffect(() => {
        productos.forEach(producto =>{
            if((producto._id) === params._id){
                setDetalle(producto)
            }
        } 
        )
    }, [params._id, productos])
   

    console.log("Detalle")
    console.log(detalle)

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dede4a'
        }
    });

    const myImage = cld.image(detalle?.urlImage);

    myImage
        .resize(pad().width(350).height(350))

  return (
    <div className='detalles'>
        <h2>{detalle?.name}</h2>
        <div className='separacion'>
            <AdvancedImage className='imagenc' cldImg={myImage} />
            <a className='precio'>Price: {detalle?.price}$</a>
        </div>
        <p className='descripcion'>{detalle?.description}</p>
    </div>
    
  )
}
