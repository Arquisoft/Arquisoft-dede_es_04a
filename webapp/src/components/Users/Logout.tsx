import { useNavigate } from 'react-router-dom';
import {ReactSession} from 'react-client-session';

const Logout = () => {

    const navigate = useNavigate();
    ReactSession.set("username",null);
    navigate('/');
    return (
    <main style={{ padding: "1rem" }}>
        <h1>Logout sucessfully</h1>
    </main>);
}

export default Logout