import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Usecase from "../../../../core/usecase/login";

export const Login = (props: any) => {
    const { setAuthState } = props;
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
