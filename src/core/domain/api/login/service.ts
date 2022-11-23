import axios from "axios";

export const postLoginInfo = (username: string, password: string) => {
    const response = axios.post("http://localhost:3001/auth/login", {
        username: username,
        password: password,
    });
    return response;
};
