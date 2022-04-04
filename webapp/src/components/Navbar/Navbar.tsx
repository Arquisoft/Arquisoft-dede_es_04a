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

    console.log(ReactSession.get("username"));
    if(true){
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Productos</Link>
                    <LoggedIn>
                        <Link className="navbar-brand" to="/addProduct">Añadir Producto</Link>
                    </LoggedIn>
                    <form className="d-flex">
                        <LoggedIn>    
                            <Link className="navbar-brand" type="button" to="/cart"><img className='CarritoImg' src={CarritoImg} alt="" width="45" height="40"/></Link> 
                            <Link className="navbar-brand" type="button" to="" onClick={logout}>Logout</Link> 
                        </LoggedIn>
                        <LoggedOut>
                            <Link className="navbar-brand" to="/login">Login</Link>
                            <Link className="navbar-brand" to="/register">Register</Link>  
                        </LoggedOut>    
                    </form>
                </div>
            </nav>
        )
    }
}

export default Navbar



