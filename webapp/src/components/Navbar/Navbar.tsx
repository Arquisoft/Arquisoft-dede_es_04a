import {Link, useNavigate} from 'react-router-dom';
import {ReactSession} from 'react-client-session';
import LoggedIn from '../Authentification/LoggedIn';
import LoggedOut from '../Authentification/LoggedOut';
import CarritoImg from '../../images/carrito.png'
import { Item } from '../../shared/sharedtypes';

type Products = {
    products: Item[];
}

const Navbar = (props: Products) => {
    const navigate = useNavigate();

    function logout(){
        ReactSession.set("user",undefined);
        props.products = [];
        navigate("/");
    }

    if(true){
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Products</Link>
                    <LoggedIn>
                        <Link className="navbar-brand" to="/addProduct">Add Product</Link>
                        <Link className="navbar-brand" to="/deleteProduct">Delete Product</Link>
                    </LoggedIn>
                    <form className="d-flex">
                        <LoggedIn>   
                            <Link className="navbar-brand" type="button" to="/cart"><img className='CarritoImg' src={CarritoImg} alt="" width="45" height="40"/></Link> 
                            <Link className="navbar-brand" type="button" to="" onClick={logout}>Logout</Link> 
                        </LoggedIn>
                        <LoggedOut>
                            <button aria-label='btnLogin'> 
                                <Link aria-label = "loginBtn" className="navbar-brand" type="button" to="/login">Login</Link>
                            </button> 
                            <Link className="navbar-brand" type="button" to="/register">Register</Link>  
                        </LoggedOut>    
                    </form>
                </div>
            </nav>
        )
    }
}

export default Navbar



