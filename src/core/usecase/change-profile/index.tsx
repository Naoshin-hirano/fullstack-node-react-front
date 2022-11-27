import { Dispatch, SetStateAction } from "react";
import { AUTH_STATE } from "../../../types";
import {
    putChangeAvatar,
    putChangePassword,
} from "../../domain/api/change-profile/service";

// パスワードの変更
export const putChangePasswordInfo = async (
    oldpassword: string,
    newpassword: string
) => {
    const result = await putChangePassword(oldpassword, newpassword);
    if (!oldpassword || !newpassword) {
        alert("パスワードを入力してください");
        return "error";
    }
    if (result.data.error) {
        alert(result.data.error);
        return "error";
    }
    alert("パスワードの変更が完了しました");
};

// アバターの変更
export const putChangeAvatarInfo = async (
    image: File | null,
    authState: AUTH_STATE,
    setAuthState: Dispatch<SetStateAction<AUTH_STATE>>
) => {
    const result = await putChangeAvatar(image);
    if (!image) {
        alert("アバター画像をアップロードしてください");
        return "error";
    }
    if (result.data.error) {
        alert(result.data.error);
        return "error";
    }
    setAuthState({
        ...authState,
        imageName: result.data.imageName,
    });
    return { imageName: result.data.imageName, status: "success" };
};
