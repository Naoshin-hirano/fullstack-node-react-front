import { AUTH_STATE } from "../../../types";
import {
    postDM,
    useGetDMList,
    useGetDMUser,
} from "../../domain/api/direct-message/service";

// DMの送信
export const postDMInfo = async (
    messageText: string,
    id: number,
    authState: AUTH_STATE
) => {
    postDM(messageText, id, authState);
};

// チャットルームのユーザー情報フェッチ
export const GetDMUser = (id: string) => {
    const result = useGetDMUser(id);
    if (result.isLoading) {
        return result;
    }
    const { dmUser, isLoading, dmUserError } = result;
    return {
        dmUser,
        dmUserError,
        isLoading,
    };
};

// DM一覧のフェッチ
export const GetDMList = () => {
    const result = useGetDMList();
    if (result.isLoading) {
        return result;
    }
    const { directMessages, isLoading, messagesError } = result;
    return {
        directMessages,
        messagesError,
        isLoading,
    };
};
