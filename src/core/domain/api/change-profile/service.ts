import axios from "axios";

// パスワードの変更
export const putChangePassword = async (
    oldpassword: string,
    newpassword: string
) => {
    const response = await axios.put(
        "http://localhost:3001/auth/changepassword",
        {
            oldPassword: oldpassword,
            newPassword: newpassword,
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken") as string,
            },
        }
    );
    return response;
};

// アバターの変更
export const putChangeAvatar = async (image: File | null) => {
    const formData = new FormData();
    formData.append("file", image as string | Blob);
    const response = await axios.put(
        "http://localhost:3001/auth/changeavatar",
        formData,
        {
            headers: {
                accessToken: localStorage.getItem("accessToken") as string,
            },
        }
    );
    return response;
};
