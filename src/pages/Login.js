import React, { useState } from 'react';
import axios from "axios";

function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");

  const login = () => {
    axios.post("http://localhost:3001/auth/login", {
        username: username,
        password: password
    })
    .then((response) => {
        console.log(response.data);
    })
  };
  return (
    <div>
        <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
        <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>

        <button onClick={login}> Login</button>
    </div>
  )
}

export default Login