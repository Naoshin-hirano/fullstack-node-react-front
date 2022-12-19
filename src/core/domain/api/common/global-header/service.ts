import axios from "axios";
import { apiConfig } from "../../../../../config";

// リクエストヘッダ
// オブジェクトのみでtoken取得時： importされたときがundefinedの場合がある
// 関数化してのtoken取得時： 関数が実行されたときのタイミングのaccessToken（すでにundefinedからユーザーのtokenに変わっている）を読み込める
// axiosにaccessTokenの機能あり
export const headers = () => ({
    headers: {
        accessToken: localStorage.getItem("accessToken") as string,
    },
});

// tokenを解析してログイン中なのか判断
export const getConfirmLoggedIn = async () => {
    const url = apiConfig.authauth.url;
    const response = await axios.get(url, headers());
    return response;
};
