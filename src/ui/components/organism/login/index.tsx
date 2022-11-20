import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Usecase from "../../../../core/usecase/login";
import { AuthContext } from "../../../../helpers/AuthContext";

export const Login = () => {
    const { setAuthState } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const login = () => {
        Usecase.postLogin(username, password, setAuthState);
        history.push("/");
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

            <button onClick={login}> ログイン</button>
        </div>
    );
};
