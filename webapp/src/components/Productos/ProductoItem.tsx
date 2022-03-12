import React from 'react';
import IM2 from "../../images/im2.png";


 const ProductoItem = () => {
    return (

        <div className="producto">
            <a href="#">
                <div className="producto__img">
                    <img src={IM2} alt="" />
                </div>
            </a>
            <div className="producto__footer">
                <h1>Samsung</h1>
                <p>Categoria</p>
                <p className="price">320€</p>
            </div>
            <div className="buttom">
                <button className="btn">
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