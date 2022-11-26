import axios from "axios";
import { apiConfig } from "../../../../config";
import { headers } from "../common/global-header/service";

// フォローとフォロー解除
export const postFollowAndUnfollow = async (id: string) => {
    const url = apiConfig.relationships.url;
    const body = {
        followedId: id,
    };
    const response = await axios.post(url, body, headers);
    return response;
};

// ユーザー情報取得
export const getUser = async (id: string) => {
    const url = `${apiConfig.userInfo.url}/${id}`;
    const response = await axios.get(url);
    return response;
};

// ユーザーによる投稿一覧取得
export const getUserPosts = async (id: string) => {
    const url = `${apiConfig.userPosts.url}/${id}`;
    const response = await axios.get(url);
    return response;
};
