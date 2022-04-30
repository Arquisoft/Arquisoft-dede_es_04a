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

    //     setProductosFiltrados(
    //         productos.filter(({ price }) => price <= )
    //     );
    // }

    const handlePrecioChangeMax = (e: any) => {
        const termino = e.target.value;
        console.log({ termino });
        console.log("Valor variable");
        console.log(inputPrecioMax);

        setProductosFiltrados(
            productos.filter(({ basePrice }) => basePrice <= termino)
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
            productos.filter(({ basePrice }) => basePrice >= termino)
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
                    <input className = 'barra_busqueda' type='text' placeholder='Buscar producto' ref={inputBusqueda} onChange={handleBusquedaChange} />
                </div>
                <div>
                    <input className = 'barra_precio_min' type='number' placeholder='Precio minimo' ref={inputPrecioMin} onChange={handlePrecioChangeMin} />
                    <input className = 'barra_precio_max' type='number' placeholder='Precio maximo' ref={inputPrecioMax} onChange={handlePrecioChangeMax} />
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
