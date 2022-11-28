import { apiConfig } from "../../../../config";
import axios from "../../../../config/setting";

export const postLoginInfo = (username: string, password: string) => {
    const url = apiConfig.login.url;
    const body = {
        username: username,
        password: password,
    };
    const response = axios.post(url, body);
    return response;
};
