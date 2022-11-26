import axios from "axios";
import { apiConfig } from "../../../../../config";

// リクエストヘッダ
export const headers = {
    headers: {
        accessToken: localStorage.getItem("accessToken") as string,
    },
};

// tokenを解析してログイン中なのか判断
export const getConfirmLoggedIn = async () => {
    const url = apiConfig.authauth.url;
    const response = await axios.get(url, headers);
    return response;
};
