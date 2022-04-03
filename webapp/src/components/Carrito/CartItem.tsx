import {Cloudinary} from "@cloudinary/url-gen";
import { Producto } from "../Productos/Producto";
import { pad } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";

export type CartItem = {
    id: number;
    name: string;
    urlImage: string;
    price: number;
    onSale: boolean;
    amount: number;
}

interface Props{
    producto: Producto;
    num: number;
}

const CartItem = (producto: Props) => {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dede4a'
        }
    }); 

    const url = producto.producto.urlImage
    const myImage = cld.image(url);

    
    
    myImage
    .resize(pad().width(250).height(250))

  return (
        <div>
          <a href="#">
                <div className="producto__img">
                    <AdvancedImage cldImg={myImage} />
                </div>
            </a>
            <div className="producto__footer">
                <h1>{producto.producto.name}</h1>
                
                <p className="price">{producto.producto.price}€</p>
            </div>
            <div className="buttom">
                <div>
                    <a href="#" className="btn">Vista</a>
                </div>
            </div>
        </div>
  );
}

export default CartItem