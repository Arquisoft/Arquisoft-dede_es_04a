import { useNavigate } from 'react-router-dom';
import {ReactSession} from 'react-client-session';

const Logout = () => {

    const navigate = useNavigate();
    ReactSession.set("username",null);
    navigate('/');
    return null;
}

export default Logout