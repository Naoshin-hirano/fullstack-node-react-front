import axios from "axios";
import { apiConfig } from "../../../../config";
import { headers } from "../common/global-header/service";

const commentsUrl = apiConfig.comments.url;

export const postAddComment = async (id: string, comment: string) => {
    const body = {
        PostId: id,
        commentBody: comment,
    };
    const response = await axios.post(commentsUrl, body, headers);
    return response;
};

export const deleteComment = async (commentId: string) => {
    const url = `${commentsUrl}/${commentId}`;
    const response = await axios.delete(url, headers);
    return response;
};

export const deletePost = async (id: string) => {
    const url = `${apiConfig.posts.url}/${id}`;
    axios.delete(url, headers);
};

export const putEditPost = async (editType: string, id: string) => {
    if (editType === "title") {
        let newTitle = prompt("タイトルを入力してください");
        const url = apiConfig.title.url;
        const body = {
            newTitle: newTitle,
            id: id,
        };
        axios.put(url, body, headers);
    } else {
        let newPostText = prompt("テキストを入力してください");
        const url = apiConfig.postText.url;
        const body = {
            newPostText: newPostText,
            id: id,
        };
        axios.put(url, body, headers);
    }
};

export const getComments = async (id: string) => {
    const url = `${commentsUrl}/${id}`;
    const response = await axios.get(url);
    return response;
};

export const getPost = async (id: string) => {
    const url = `${apiConfig.postsById.url}/${id}`;
    const response = await axios.get(url);
    return response;
};
