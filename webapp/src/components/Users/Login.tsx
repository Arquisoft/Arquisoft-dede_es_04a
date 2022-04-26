import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../../shared/sharedtypes";
import * as userService from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {ReactSession} from 'react-client-session';

const Login = () => {

    const navigate = useNavigate();

    const initialState = {
        username: "",
        password: "",
    };

    const [user, setUser] = useState<User>({ username: '', password: '' })

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!checkEmpty()) {
            setUser(initialState);
            toast.error("There is any field empty");
        }
        else {
            try {
                const result = await userService.login(user);
                if (result.status === 200) {
                    user.token = result.data.token;
                    ReactSession.set("user", user);
                    toast.success("Welcome back " + ReactSession.get("user").username);
                    navigate('/');
                }
            } catch (error) {
                setUser(initialState);
                toast.error("Username or password dont exist");
            }
        }
    }

    const checkEmpty = (): boolean => {
        if (user.username === initialState.username)
            return false;
        if (user.password === initialState.password)
            return false;
        return true;
    }

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Login</h3>
                        <form onSubmit={submit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={user.username}
                                    autoFocus
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={user.password}
                                />
                            </div>

                            <button className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
