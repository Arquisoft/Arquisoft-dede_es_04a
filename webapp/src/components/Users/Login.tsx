import React, { ChangeEvent, FormEvent, useState } from "react";
import { User } from "./User";

const Login = () => {

    const [user, setUser] = useState<User>({username:'', password:''})

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const submit = (e: FormEvent<HTMLFormElement>) => {

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
