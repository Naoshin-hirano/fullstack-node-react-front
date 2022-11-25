import { Dispatch, SetStateAction } from "react";
import { AUTH_STATE } from "../../../../types";
import { getConfirmLoggedIn } from "../../../domain/api/common/global-header/service";

// tokenを解析してログイン中なのか判断
export const getConfirmLoggedInInfo = async (
    authState: AUTH_STATE,
    setAuthState: Dispatch<SetStateAction<AUTH_STATE>>
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
