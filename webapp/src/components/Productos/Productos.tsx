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
        console.log("productos");
        console.log(res)
        let datos = res.data
        console.log(datos)
        setProductos(datos.products)
        setProductosFiltrados(datos.products)
    }

    const handleBusquedaChange = (e: any) => {
        const termino = e.target.value;
        console.log({ termino });
        // setTerminoBusqueda(termino);
        setProductosFiltrados(
            productos.filter(({ name }) => name.toLowerCase().includes(termino.toLowerCase()))
        );
    }

    // const handleChange = () => {
    //     const preMax = inputPrecioMax.current?.value;
    //     const preMin = inputPrecioMin.current?.value;

    //     console.log("max")
    //     console.log(preMax)

    //     console.log("min")
    //     console.log(preMin)


    //     setProductosFiltrados(productos)

    //     console.log("prods")
    //     console.log(productos)

    //     console.log("prodsFiltrados")
    //     console.log(productosFiltrados)
        
    //     if(preMax !== undefined && preMax !== ""){
    //         console.log("Llego a filtrar por max")
    //         setProductosFiltrados(
    //             productosFiltrados.filter(({ basePrice, IVA }) => basePrice + (basePrice * IVA) <= parseInt(preMax))
    //         );
    //     }

    //     if(preMin !== undefined && preMin !== ""){
    //         console.log("Llego a filtrar por min")
    //         setProductosFiltrados(
    //             productosFiltrados.filter(({ basePrice, IVA }) => basePrice + (basePrice * IVA) >= parseInt(preMin))
    //         );
    //     }

    // }

    const handlePrecioChangeMax = (e: any) => {
        const termino = e.target.value;
        console.log({ termino });
        console.log("Valor variable");
        console.log(inputPrecioMax);

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
        console.log({ termino });
        
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
                    <input aria-label= "searchProd" className = 'barra_busqueda' type='text' placeholder='Search product' ref={inputBusqueda} onChange={handleBusquedaChange} />
                </div>
                <div>
                    <input className = 'barra_precio_min' type='number' placeholder='Minimum price' ref={inputPrecioMin} onChange={handlePrecioChangeMin} />
                    <input className = 'barra_precio_max' type='number' placeholder='Maximum price' ref={inputPrecioMax} onChange={handlePrecioChangeMax} />
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
