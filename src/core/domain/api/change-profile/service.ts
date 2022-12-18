import axios from "axios";
import { apiConfig } from "../../../../config";
import { headers } from "../common/global-header/service";

// パスワードの変更
export const putChangePassword = async (
    oldpassword: string,
    newpassword: string
) => {
    const url = apiConfig.changePassword.url;
    const body = {
        oldPassword: oldpassword,
        newPassword: newpassword,
    };
    const response = await axios.put(url, body, headers);
    return response;
};

// アバターの変更
export const putChangeAvatar = async (image: File | null) => {
    const url = apiConfig.changeAvatar.url;
    const formData = new FormData();
    formData.append("file", image as string | Blob);
    // todo: importしたheadersを使用すると時折undefinedになりエラーが出るので直書きにしている
    const response = await axios.put(url, formData, {
        headers: {
            accessToken: localStorage.getItem("accessToken") as string,
        },
    });
    return response;
};
