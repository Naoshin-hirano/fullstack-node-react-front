import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Usecase from "../../../../core/usecase/login";
import { mainProps } from "../../template/login";

export const Login = (props: mainProps) => {
    const { setAuthState } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const login = async () => {
        await Usecase.postLogin(username, password, setAuthState);
        history.push("/");
    };
    return (
        <div className="loginContainer">
            <label>ユーザー名 </label>
            <input
                type="text"
                value={username}
                placeholder="ユーザー名"
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <label>パスワード </label>
            <input
                type="password"
                value={password}
                placeholder="パスワード"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button onClick={login}> ログイン</button>
        </div>
    );
};
