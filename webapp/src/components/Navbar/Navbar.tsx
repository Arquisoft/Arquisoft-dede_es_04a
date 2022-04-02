import React, { useContext, useState } from "react";
import {Link} from 'react-router-dom';
import * as Icon from "react-bootstrap-icons"

type Props = {
    handleOpen: (state: boolean) => void;
}

const Navbar = ({handleOpen}: Props) => {

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Productos</Link>
                <Link className="navbar-brand" to="/aniadirProducto">Añadir producto</Link>
                <div className="cart" >
                    <button onClick={() => handleOpen(true)}>
                        <Icon.Cart />
                    </button>
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



