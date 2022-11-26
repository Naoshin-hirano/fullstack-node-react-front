import axios from "axios";
import useSWR from "swr";
import { apiConfig } from "../../../../config";
import { DM_OBJ, USER } from "../../../../types";
import { headers } from "../common/global-header/service";

// DMの送信
export const postDM = async (messageText: string) => {
    const url = apiConfig.dm.url;
    const body = { text: messageText };
    const response = await axios.post(url, body, headers);
    return response;
};

// チャットルームのユーザー情報フェッチ
export const useGetDMUser = (id: string) => {
    const url = `${apiConfig.dmUser.url}/${id}`;
    const { data: dmUser, error: dmUserError } = useSWR<USER, Error>(url, {
        refreshInterval: 500,
    });
    return {
        dmUser,
        isLoading: !dmUser && !dmUserError,
        dmUserError,
    };
};

// DM一覧のフェッチ
export const useGetDMList = () => {
    const url = apiConfig.dm.url;
    const { data: directMessages, error: messagesError } = useSWR<
        DM_OBJ[],
        Error
    >(url, {
        refreshInterval: 500,
    });
    return {
        directMessages,
        isLoading: !directMessages && !messagesError,
        messagesError,
    };
};
