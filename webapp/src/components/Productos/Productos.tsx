import { useEffect, useRef, useState} from 'react'
import * as productService from '../Services/ProductsService'
import {Producto, Item} from '../../shared/sharedtypes'
import ProductoItem from './ProductoItem'

type Products = {
    products: Item[];
}

const Productos = (props: Products) => {
    
    const[productos, setProductos] = useState<Producto[]>([])
    const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([])
    // const[productosParaFiltro, setProductosParaFiltro] = useState<Producto[]>([])
    const inputBusqueda = useRef<HTMLInputElement>(null);
    const inputPrecioMax = useRef<HTMLInputElement>(null);
    const inputPrecioMin = useRef<HTMLInputElement>(null);
    
    const loadProductos = async ()=>{
        const res = await productService.getProductos()
        let datos = res.data
        setProductos(datos.products)
        setProductosFiltrados(datos.products)
    }

    const handleBusquedaChange = (e: any) => {
        const termino = e.target.value;
        // setTerminoBusqueda(termino);
        setProductosFiltrados(
            productos.filter(({ name }) => name.toLowerCase().includes(termino.toLowerCase()))
        );
    }

    // const handleChange = () => {
    //     const preMax = inputPrecioMax.current?.value;
    //     const preMin = inputPrecioMin.current?.value;



    //     setProductosFiltrados(productos)

    //     if(preMax !== undefined && preMax !== ""){
    //         setProductosFiltrados(
    //             productosFiltrados.filter(({ basePrice, IVA }) => basePrice + (basePrice * IVA) <= parseInt(preMax))
    //         );
    //     }

    //     if(preMin !== undefined && preMin !== ""){
    //         setProductosFiltrados(
    //             productosFiltrados.filter(({ basePrice, IVA }) => basePrice + (basePrice * IVA) >= parseInt(preMin))
    //         );
    //     }

    // }

    const handlePrecioChangeMax = (e: any) => {
        const termino = e.target.value;


        setProductosFiltrados(
            productos.filter(({ basePrice, IVA }) => basePrice + (basePrice * IVA) <= termino)
        );
        if(termino === ''){
            setProductosFiltrados(
                productos.filter(({ basePrice }) => basePrice <= 9999999)
            );
       }
    }

    const handlePrecioChangeMin = (e: any) => {
        const termino = e.target.value;
        
        setProductosFiltrados(
            productos.filter(({ basePrice, IVA }) =>(basePrice + (basePrice * IVA) >= termino))
        );

        if(termino === ''){
            setProductosFiltrados(
                productos.filter(({ basePrice }) => basePrice > 0)
            );
       }
    }

    useEffect(()=>{
        loadProductos()
    }, [])


    return (
        <div>
            <h1 className='title'>PRODUCTS</h1>
            <div className='filtros'>
                <div>
                    <h5 className='search'>Search:</h5>
                    <input aria-label= "searchProd" className = 'barra_busqueda' type='text' placeholder='Search product' ref={inputBusqueda} onChange={handleBusquedaChange} />
                </div>
                <div>
                    <input min={1} aria-label= "minPrice" className = 'barra_precio_min' type='number' placeholder='Minimum price' ref={inputPrecioMin} onChange={handlePrecioChangeMin} />
                    <input min= {1}aria-label= "maxPrice" className = 'barra_precio_max' type='number' placeholder='Maximum price' ref={inputPrecioMax} onChange={handlePrecioChangeMax} />
                </div>
            </div>
            <div className='productos'>
            {productosFiltrados.map((producto) => {
                return <ProductoItem producto={producto} key={producto.name} cart={props.products}/>
            })}
            </div>
        </div>

    )
}

export default Productos;
