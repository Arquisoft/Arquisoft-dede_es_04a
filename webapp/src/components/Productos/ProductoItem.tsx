import { useEffect, useState } from 'react'
import { Producto } from './Producto'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { ReactSession } from 'react-client-session';

import { pad } from "@cloudinary/url-gen/actions/resize";
import { Item } from '../Carrito/Carrito';

interface Props {
    producto: Producto;
    cart: Item[];
    onCartUpdate: (items: Item[]) => void;
}

const ProductoItem = ({ producto, cart, onCartUpdate }: Props) => {

    const addToCart = () => {
        const newCart = [...cart];

        const item = newCart.find(item => item.producto._id === producto._id);

        if (item) {
            item.num += 1;
        } else {
            newCart.push({ producto, num: 1 });
        }

        onCartUpdate(newCart);
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
                    <a href={'/producto/' + producto._id} className="btn">Vista</a>
                </div>
            </div>
        </div>
    )
}

export default ProductoItem