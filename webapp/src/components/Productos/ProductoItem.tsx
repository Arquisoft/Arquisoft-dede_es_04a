import React, { useEffect, useState } from 'react'
import {Producto} from './Producto'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {ReactSession} from 'react-client-session';

import {thumbnail, scale, pad} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {sepia} from "@cloudinary/url-gen/actions/effect";
import {source} from "@cloudinary/url-gen/actions/overlay";
import {opacity,brightness} from "@cloudinary/url-gen/actions/adjust";
import {byAngle} from "@cloudinary/url-gen/actions/rotate"

// Import required qualifiers.
import {image} from "@cloudinary/url-gen/qualifiers/source";
import {Position} from "@cloudinary/url-gen/qualifiers/position";
import {compass} from "@cloudinary/url-gen/qualifiers/gravity";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import {fill} from "@cloudinary/url-gen/actions/resize";

interface Props{
  producto: Producto
}

const ProductoItem = ({producto}: Props) => {

    //var map = new Map<Producto,number>();
    const [map, setMap] = useState(new Map());

    const updateMap = (k:Producto,v:number) => {
        setMap(map.set(k,v));
    }
    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(map));
    }, [map]);
      
    const addToCart = () =>{
        if(localStorage.getItem("cart")===undefined)
        localStorage.setItem("cart", JSON.stringify(map));

        setMap(JSON.parse(localStorage.getItem("cart") || '{}'));
        if(map.has(producto)){
            updateMap(producto,map.get(producto)+1);
        }
        else
            updateMap(producto,1);

        console.log(JSON.parse(localStorage.getItem("cart") || '{h}'));
    }

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dede4a'
        }
    }); 

    const url = producto.urlImage
    const myImage = cld.image(url);

    
    
    myImage
    .resize(pad().width(250).height(250))

  return (
    <div className="producto">
            <a href="#">
                <div className="producto__img">
                    <AdvancedImage cldImg={myImage} />
                </div>
            </a>
            <div className="producto__footer">
                <h1>{producto.name}</h1>
                
                <p className="price">{producto.price}€</p>
            </div>
            <div className="buttom">
                <button className="btn" onClick={addToCart}>
                    Añadir al carrito
                </button>
                <div>
                    <a href="#" className="btn">Vista</a>
                </div>
            </div>
      </div>
  )
}

export default ProductoItem