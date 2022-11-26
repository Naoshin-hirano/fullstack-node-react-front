import axios from "axios";
import { apiConfig } from "../../../../config";

export const postLoginInfo = (username: string, password: string) => {
    const url = apiConfig.login.url;
    const body = {
        username: username,
        password: password,
    };
    const response = axios.post(url, body);
    return response;
};
