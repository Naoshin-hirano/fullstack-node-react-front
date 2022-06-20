import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const history = useHistory();

  const login = () => {
    axios.post("http://localhost:3001/auth/login", {
        username: username,
        password: password
    })
    .then((response) => {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            sessionStorage.setItem("accessToken", response.data);
            history.push("/");
        }
    })
  };
  return (
    <div className="loginContainer">
        <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
        <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>

        <button onClick={login}> Login</button>
    </div>
  )
}

export default Login