import {Link, useNavigate} from 'react-router-dom';
import {ReactSession} from 'react-client-session';
import LoggedIn from '../Authentification/LoggedIn';
import LoggedOut from '../Authentification/LoggedOut';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Item } from '../../shared/sharedtypes';
import AdminRole from '../Authentification/AdminRole';
import LogoutIcon from '@mui/icons-material/Logout';

type Products = {
    products: Item[];
}

const Navbar = (props: Products) => {
    const navigate = useNavigate();

    function logout(){
        ReactSession.set("user",undefined);
        ReactSession.set("order",undefined);
        props.products = [];
        navigate("/");
    }
    
    return (    
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" type="button" to="/">TechZone</Link>
                <LoggedIn>
                    <Link className="navbar-brand" type="button" to="/order/list">My orders</Link>
                    <AdminRole>
                        <Link className="navbar-brand" type="button" to="/addProduct">Add Product</Link>
                        <Link className="navbar-brand" type="button" to="/deleteProduct">Delete Product</Link>
                    </AdminRole>
                </LoggedIn>
                <form className="d-flex">
                    <LoggedIn>  
                        <Link className="navbar-brand" type="button" to="/cart"><ShoppingCartIcon></ShoppingCartIcon></Link> 
                        <Link className="navbar-brand" type="button" to="" onClick={logout}><LogoutIcon/></Link> 
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

export default Navbar



