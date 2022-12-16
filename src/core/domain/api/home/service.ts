import axios from "axios";
import { apiConfig } from "../../../../config";
import { headers } from "../common/global-header/service";

// いいね投稿と解除
export const postLike = async (postId: number) => {
    const url = apiConfig.likes.url;
    const body = { PostId: postId };
    const response = await axios.post(url, body, headers);
    return response;
};

// 検索候補一覧を取得
export const getSuggestion = async () => {
    const url = apiConfig.suggests.url;
    const response = await axios.get(url);
    return response;
};

// 検索候補で選んだ投稿を取得
export const getSearchedPosts = async (keyword: string) => {
    const url = `${apiConfig.search.url}/${keyword}`;
    const response = await axios.get(url, headers);
    return response;
};

// 全ての投稿を取得
export const getAllPosts = async () => {
    const url = apiConfig.posts.url;
    const response = await axios.get(url, headers);
    console.log("headers", headers);
    return response;
};
