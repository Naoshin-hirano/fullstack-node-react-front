import axios from "axios";
import { apiConfig } from "../../../../config";

export const tagPostGet = (id: string) => {
    const url = `${apiConfig.hashTagPosts.url}/${id}`;
    // todo: importしたheadersを使用すると時折undefinedになりエラーが出るので直書きにしている
    const response = axios.get(url, {
        headers: {
            accessToken: localStorage.getItem("accessToken") as string,
        },
    });
    return response;
};
