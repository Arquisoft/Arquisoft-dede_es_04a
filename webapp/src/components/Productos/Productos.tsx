import { useEffect, useState, useRef } from 'react'
import * as productoService from './ProductosService'
import { Producto } from './Producto'
import ProductoItem from './ProductoItem'
import { Item } from '../Carrito/Carrito'

type Products = {
    products: Item[];
    onCartUpdate: (items: Item[]) => void;
}

const Productos = ({ products, onCartUpdate }: Products) => {

    // const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [productos, setProductos] = useState<Producto[]>([])
    const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([])
    const inputBusqueda = useRef<HTMLInputElement>(null);
    const inputPrecio = useRef<HTMLInputElement>(null);

    const loadProductos = async () => {
        const res = await productoService.getProductos()
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
    
    const handlePrecioChangeMax = (e: any) => {
        const termino = e.target.value;
        console.log({ termino });
        
        setProductosFiltrados(
            productos.filter(({ price }) => price <= termino)
        );
        if(termino ==''){
            setProductosFiltrados(
                productos.filter(({ price }) => price <= 9999999)
            );
       }
    }

    const handlePrecioChangeMin = (e: any) => {
        const termino = e.target.value;
        console.log({ termino });
        
        setProductosFiltrados(
            productos.filter(({ price }) => price = termino)
        );
        if(termino ==''){
            setProductosFiltrados(
                productos.filter(({ price }) => price > 0)
            );
       }
    }

    useEffect(() => {
        loadProductos()
    }, [])

    return (
        <div>
            <h1 className='title'>PRODUCTOS</h1>
            <div className='filtros'>
                <div>
                    <input className = 'barra_busqueda' type='text' placeholder='Buscar producto' ref={inputBusqueda} onChange={handleBusquedaChange} />
                </div>
                <div>
                    <input className = 'barra_precio_min' type='number' placeholder='Precio minimo' ref={inputPrecio} onChange={handlePrecioChangeMin} />
                    <input className = 'barra_precio_max' type='number' placeholder='Precio maximo' ref={inputPrecio} onChange={handlePrecioChangeMax} />
                </div>
            </div>
            <div className='productos'>
                {productosFiltrados.map((producto) => {
                    return <ProductoItem producto={producto} key={producto.name} cart={products} onCartUpdate={onCartUpdate} />
                })}
            </div>
        </div>

    )
}

export default Productos;
