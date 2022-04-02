import * as Icon from "react-bootstrap-icons"
import React, {useState, useContext} from 'react'
import Image from "../../images/sergio.webp"
import  DataContext from "./DataProvider"




const Carrito = () => {
  const value = useContext(DataContext)

  const show1 = value.menu ? "carritos show" : "carritos"
  const show2 = value.menu ? "carrito show" : "carrito"

  return (
    <div className = {show1}>
        <div className = {show2}>
            <div className ="carrito_close">
              <button >
                <Icon.X />
              </button>
            </div>
            <h2>Su carrito</h2>
            <div className="carrito_center">
              <div className="carrito_item">
                <img src={Image} alt=""/>
                <div>
                  <h3>title</h3>
                  <p className="price">$100</p>
                </div>
                <div>
                  <button><Icon.ArrowUp /></button>
                  <p className="cantidad">1</p>
                  <button><Icon.ArrowDown /></button>
                </div>

                <div className="remove_item">
                  <button><Icon.Trash /></button>
                </div>
              </div>

              <div className="carrito_item">
                <img src={Image} alt=""/>
                <div>
                  <h3>title</h3>
                  <p className="price">$100</p>
                </div>
                <div>
                  <button><Icon.ArrowUp /></button>
                  <p className="cantidad">1</p>
                  <button><Icon.ArrowDown /></button>
                </div>

                <div className="remove_item">
                  <button><Icon.Trash /></button>
                </div>
              </div>

              <div className="carrito_item">
                <img src={Image} alt=""/>
                <div>
                  <h3>title</h3>
                  <p className="price">$100</p>
                </div>
                <div>
                  <button><Icon.ArrowUp /></button>
                  <p className="cantidad">1</p>
                  <button><Icon.ArrowDown /></button>
                </div>

                <div className="remove_item">
                  <button><Icon.Trash /></button>
                </div>
              </div>

              <div className="carrito_footer">
                <h3>Total: $2334</h3>
                <button className="btn_payment">Payment</button>
              </div>
            </div>
        </div> 
    </div>
    
  )
}

export default Carrito
