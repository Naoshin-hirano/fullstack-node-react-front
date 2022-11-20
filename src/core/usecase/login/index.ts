import { postLoginInfo } from "../../domain/api/login/service";

export const postLogin = async (
    username: string,
    password: string,
    setAuthState: any
) => {
    const result = await postLoginInfo(username, password);
    if (result.data.error) {
        alert(result.data.error);
    } else {
        localStorage.setItem("accessToken", result.data.token);
        setAuthState({
            username: result.data.username,
            id: result.data.id,
            status: true,
            imageName: result.data.imageName,
        });
    }
};
