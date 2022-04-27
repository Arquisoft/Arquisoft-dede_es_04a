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

    useEffect(() => {
        loadProductos()
    }, [])

    return (
        <div>
            <h1 className='title'>PRODUCTOS</h1>
            <section className='barra_busqueda'>
                <input type='text' placeholder='Buscar producto' ref={inputBusqueda} onChange={handleBusquedaChange} />
            </section>
            <div className='productos'>
                {productosFiltrados.map((producto) => {
                    return <ProductoItem producto={producto} key={producto.name} cart={products} onCartUpdate={onCartUpdate} />
                })}
            </div>
        </div>

    )
}

export default Productos;
