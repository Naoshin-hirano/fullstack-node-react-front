import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Usecase from "../../../../core/usecase/login";
import { mainProps } from "../../template/login";

export const Login = (props: mainProps) => {
    const { setAuthState } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const login = async (username: string, password: string) => {
        await Usecase.postLogin(username, password, setAuthState);
        history.push("/");
    };
    return (
        <div className="loginContainer">
            <h2>ログイン</h2>
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
            <button onClick={() => login(username, password)}> ログイン</button>
            <h4>下記からパスワードなしでログインできます</h4>
            <button onClick={() => login("GuestUser", "Guest1120!")}>
                ゲストログイン
            </button>
        </div>
    );
};
