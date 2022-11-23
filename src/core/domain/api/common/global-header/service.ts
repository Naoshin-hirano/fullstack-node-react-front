import axios from "axios";

// tokenを解析してログイン中なのか判断
export const getConfirmLoggedIn = async () => {
    const response = await axios.get("http://localhost:3001/auth/auth", {
        headers: {
            accessToken: localStorage.getItem("accessToken") as string,
        },
    });
    return response;
};
