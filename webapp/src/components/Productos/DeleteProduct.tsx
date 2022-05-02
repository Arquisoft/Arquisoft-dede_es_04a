import { useEffect, useState } from "react";
import { Producto } from "../../shared/sharedtypes";
import * as productService from '../Services/ProductsService';
import ProductoDeleteItem from "./ProductoDeleteItem";

export const DeleteProduct = () => {


    const[productos, setProductos] = useState<Producto[]>([])

    const loadProductos = async ()=>{
        const res = await productService.getProductos()
        console.log("carga Prods")
        console.log(res)
        let datos = res.data
        console.log(datos)
        setProductos(datos.products)
    }

    useEffect(()=>{
        loadProductos()
    }, [])


  return (
    <div className="row">
            <h1 className='title'>DELETE PRODUCT</h1>
            <div className='productos'>
            {productos.map((producto) => {
                return <ProductoDeleteItem producto={producto} key={producto.name}/>
            })}
            </div>
        </div>
  )
}
