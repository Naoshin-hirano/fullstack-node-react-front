import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const { setAuthState } = useContext<any>(AuthContext);

    const login = () => {
        axios
            .post("https://fullstack-api-node.herokuapp.com/auth/login", {
                username: username,
                password: password,
            })
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    localStorage.setItem("accessToken", response.data.token);
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        status: true,
                    });
                    history.push("/");
                }
            });
    };
    return (
        <div className="loginContainer">
            <input
                type="text"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />

            <button onClick={login}> Login</button>
        </div>
    );
}

export default Login;
