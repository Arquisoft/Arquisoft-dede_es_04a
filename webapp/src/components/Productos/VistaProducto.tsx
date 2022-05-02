import { useEffect, useState } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";
import { pad } from "@cloudinary/url-gen/actions/resize";
import {Producto, Item} from '../../shared/sharedtypes'
import {useNavigate, useParams} from "react-router-dom";
import * as productoService from '../Services/ProductsService';
import {ReactSession} from 'react-client-session';

interface Props{
    cart: Item[];
}


export const VistaProducto = ({cart}: Props) => {

    const initialState = {
        category:"",
        name: "",
        description: "",
        urlImage: "",
        basePrice: 0,
        units: 0,
        onSale: true,
        IVA: 0.21
    };

    const [productos, setProductos] = useState<Producto[]>([])
    const [detalle, setDetalle] = useState<Producto>(initialState)
    const navigate = useNavigate();


    const params = useParams();
    

    const loadProductos = async () => {
        const res = await productoService.getProductos()
        let datos = res.data
        setProductos(datos.products)   
    }

    useEffect(() => {
        loadProductos()
    }, [])


    useEffect(() => {
        productos.forEach(producto =>{
            if((producto._id) === params._id){
                setDetalle(producto)
            }
        } 
        )
    }, [params._id, productos])
   


    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dede4a'
        }
    });

    const myImage = cld.image(detalle?.urlImage);

    myImage
        .resize(pad().width(350).height(350))

    const addToCart = () =>{
        if(ReactSession.get("user")===undefined){
            navigate("/login");
            return;
        }

        var contains = false;
        if(detalle !== undefined){
        cart.forEach( item => {
            if(item.producto.name===detalle.name){
                item.num+=1;
                contains = true;    
            }
        });
        let num = 1;
        const producto = detalle;
        if(contains===false)
            cart.push({producto,num});
     }
    }
    const price = detalle?.basePrice + (detalle?.basePrice * detalle?.IVA)

    
    const url = "https://res.cloudinary.com/dede4a/image/upload/"+detalle.urlImage+"?_a=AJADJWI0";
    

  return (
    <div className='detalles'>
        <h2>{detalle?.name}</h2>
        <div className='separacion'>
            <img alt="" className='imagenc' src={url}></img>
            <p className='precio'>Price: {price.toFixed(2)}$</p>
        </div>
        <p className='descripcion'>{detalle?.description}</p>
        <button className="btn" onClick={addToCart}>
                    Add to cart
        </button>
    </div>
    
  )
}
