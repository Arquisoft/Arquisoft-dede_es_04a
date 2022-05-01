import { Producto } from "../../shared/sharedtypes";

interface Props{
    producto: Producto;
    num: number;
    
}

const CartItem = ({producto, num}: Props) => {
    const url = "https://res.cloudinary.com/dede4a/image/upload/"+producto.urlImage+"?_a=AJADJWI0";
    const price = producto.basePrice + (producto.basePrice * producto.IVA);

  return (
        <div>
            <div className="producto__img">
                <img src={url}></img>
            </div>
            <div className="producto__footer">
                <h1>{producto.name}</h1>
                <p>Units: {num}</p>
                <p className="price">{price.toFixed(2)}€</p>
            </div>
            
        </div>
  );
}

export default CartItem