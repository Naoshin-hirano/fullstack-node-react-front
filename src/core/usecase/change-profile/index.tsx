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
    if (result.data.error) {
        alert(result.data.error);
    }
    console.log("パスワードの変更が完了しました");
};

// アバターの変更
export const putChangeAvatarInfo = async (
    image: File | null,
    authState: any,
    setAuthState: any
) => {
    const result = await putChangeAvatar(image);
    if (result?.data.error) {
        return alert(result.data.error);
    }
    setAuthState({
        ...authState,
        imageName: result?.data.imageName,
    });
    console.log("アバターの変更が完了しました");
};
