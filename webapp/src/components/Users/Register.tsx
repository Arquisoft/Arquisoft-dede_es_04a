import React, { ChangeEvent, FormEvent, useState } from "react";
import { User } from "./User";
import * as userService from './UserService';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Register = () => {

    const navigate = useNavigate();

    const initialState = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        dni: "",
        token: ""
    };

    const [user, setUser] = useState<User>(initialState);

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!checkEmpty()) {
            setUser(initialState);
            toast.error("There is any field empty");
        }
        else if (!checkPasswords()) {
            setUser(initialState);
            toast.error("The passwords dont match");
        }
        else {
            try {
                await userService.createNewUser(user);
                toast.success("Succesfully registered");
                navigate('/');
            } catch (error) {
                setUser(initialState);
                toast.error("Username or email are already used");
            }
        }
    }

    const checkPasswords = (): boolean => {
        if (user.confirmPassword === user.password)
            return true;
        return false;
    }

    const checkEmpty = (): boolean => {
        if (user.username === initialState.username)
            return false;
        if (user.password === initialState.password)
            return false;
        if (user.confirmPassword === initialState.confirmPassword)
            return false;
        if (user.dni === initialState.dni)
            return false;
        if (user.email === initialState.email)
            return false;
        return true;
    }

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Register</h3>
                        <form name = "register" onSubmit={submit}>
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
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={user.email}
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

                            <div className="form-group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Repeat password"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={user.confirmPassword}
                                />
                            </div>


                            <div className="form-group">
                                <input
                                    type="text"
                                    name="dni"
                                    placeholder="DNI"
                                    className="form-control"
                                    onChange={inputChange}
                                    value={user.dni}
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

export default Register
