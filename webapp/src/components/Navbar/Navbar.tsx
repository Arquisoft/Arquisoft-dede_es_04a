import React from "react";
import {Link} from 'react-router-dom';
import {ReactSession} from 'react-client-session';

const Navbar = () => {
    if(ReactSession.get("username")===null){
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Productos</Link>
                    <form className="d-flex">
                        <Link className="navbar-brand" to="/login">Login</Link>
                        <Link className="navbar-brand" to="/register">Register</Link>      
                    </form>
                </div>
            </nav>
        )
    }
    else{
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Productos</Link>
                    <form className="d-flex">
                        <Link className="navbar-brand" to="">{ReactSession.get("username")}</Link>
                        <Link className="navbar-brand" to="/logout">Logout</Link>      
                    </form>
                </div>
            </nav>
        )
    }
}

export default Navbar