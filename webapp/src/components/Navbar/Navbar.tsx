import {Link, useNavigate} from 'react-router-dom';
import {ReactSession} from 'react-client-session';
import LoggedIn from '../AuthentificationComponents/LoggedIn';
import LoggedOut from '../AuthentificationComponents/LoggedOut';
import CarritoImg from '../../images/carrito.png'

const Navbar = () => {
    const navigate = useNavigate();

    function logout(){
        ReactSession.set("username",undefined);
        navigate("/");
    }

    function toProductos(){
        navigate("/");
    }

    function toAdd(){
        navigate("/addProduct");
    }

    function toCart(){
        navigate("/cart");
    }

    function toLogin(){
        navigate("/login");
    }

    function toRegister(){
        navigate("/register");
    }

    console.log(ReactSession.get("username"));
    if(true){
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" type="button" to="" onClick={toProductos}>Productos</Link>
                    <LoggedIn>
                        <button onClick={toAdd}>Añadir Producto</button>
                    </LoggedIn>
                    <form className="d-flex">
                        <LoggedIn>    
                            <Link className="navbar-brand" type= "button" to="/cart" onClick={toCart}><img className='CarritoImg' src={CarritoImg} alt="" width="45" height="40"/></Link> 
                            <Link className="navbar-brand" type="button" to="" onClick={logout}>Logout</Link> 
                        </LoggedIn>
                        <LoggedOut>
                            <button onClick={toLogin}>Login</button>
                            <button onClick={toRegister}>Register</button>  
                        </LoggedOut>    
                    </form>
                </div>
            </nav>
        )
    }
}

export default Navbar



