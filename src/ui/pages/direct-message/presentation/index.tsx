import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GetDMList, GetDMUser } from "../../../../core/usecase/direct-message";
import { AuthContext } from "../../../../helpers/AuthContext";

export const useCreateProps = () => {
    let { id } = useParams<{ id: string }>();
    // チャットルームのユーザー情報フェッチ
    const { dmUser, dmUserError } = GetDMUser(id);
    // DM一覧のフェッチ
    const { directMessages, messagesError, isLoading } = GetDMList();
    // ログインユーザーの情報
    const { authState } = useContext(AuthContext);
    return {
        authState,
        dmUser,
        dmUserError,
        directMessages,
        messagesError,
        isLoading,
        id,
    };
};
