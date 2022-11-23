import { getConfirmLoggedIn } from "../../../domain/api/common/global-header/service";

// tokenを解析してログイン中なのか判断
export const getConfirmLoggedInInfo = async (
    authState: any,
    setAuthState: any
) => {
    const result = await getConfirmLoggedIn();
    if (result.data.error) {
        setAuthState({
            ...authState,
            status: false,
        });
    } else {
        setAuthState({
            username: result.data.username,
            id: result.data.id,
            status: true,
            imageName: result.data.imageName,
        });
    }
};
