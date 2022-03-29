import React from "react";
import {Link} from 'react-router-dom';
import { BiCart } from "react-icons/bi"
const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Productos</Link>
                <Link className="navbar-brand" to="/aniadirProducto">Añadir producto</Link>
                <div className="cart">
                    <BiCart></BiCart>
                </div>
                <form className="d-flex">
                    <Link className="navbar-brand" to="/login">Login</Link>
                    <Link className="navbar-brand" to="/register">Register</Link>      
                </form>
            </div>
        </nav>
    )
}

export default Navbar


