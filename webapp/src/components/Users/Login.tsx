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
                    user.role = result.data.userResult.userRol;
                    user.email = result.data.userResult.userEmail;
                    ReactSession.set("user", user);
                    console.log(user)
                    toast.success("Welcome back " + ReactSession.get("user").username);
                    navigate('/');
                }
            } catch (error) {
                setUser(initialState);
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
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={user.username}
                                    autoFocus
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={user.password}
                                />
                            </div>

                            <button aria-label = "submit" className="btn btn-primary">
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
