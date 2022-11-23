import axios from "axios";
import useSWR from "swr";

// DMの送信
export const postDM = async (messageText: string) => {
    const response = await axios.post(
        "http://localhost:3001/directmessages",
        { text: messageText },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken") as string,
            },
        }
    );
    return response;
};

// チャットルームのユーザー情報フェッチ
export const useGetDMUser = (id: string) => {
    const { data: dmUser, error: dmUserError } = useSWR(
        `http://localhost:3001/auth/dmUser/${id}`,
        {
            refreshInterval: 500,
        }
    );
    return {
        dmUser,
        isLoading: !dmUser && !dmUserError,
        dmUserError,
    };
};

// DM一覧のフェッチ
export const useGetDMList = () => {
    const { data: directMessages, error: messagesError } = useSWR(
        "http://localhost:3001/directmessages",
        {
            refreshInterval: 500,
        }
    );
    return {
        directMessages,
        isLoading: !directMessages && !messagesError,
        messagesError,
    };
};
