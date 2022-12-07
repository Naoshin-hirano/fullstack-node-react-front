import { Dispatch, SetStateAction } from "react";
import { COMMENT, POST } from "../../../types";
import {
    deleteComment,
    deletePost,
    getComments,
    getPost,
    postAddComment,
    putEditPost,
} from "../../domain/api/post/service";

export const postAddCommentInfo = async (id: string, comment: string) => {
    const result = await postAddComment(id, comment);
    if (result.data.error) {
        console.log(result.data.error);
    }
    return result;
};

export const deleteCommentInfo = async (commentId: string) => {
    const result = await deleteComment(commentId);
    return result;
};

export const deletePostInfo = async (id: string) => {
    deletePost(id);
};

export const putEditPostInfo = async (editType: string, id: string) => {
    putEditPost(editType, id);
};

export const getCommentsInfo = async (
    id: string,
    setComments: Dispatch<SetStateAction<COMMENT[]>>
) => {
    const result = await getComments(id);
    setComments(result.data);
};

export const getPostInfo = async (
    id: string,
    setPost: Dispatch<SetStateAction<POST | undefined>>
) => {
    const result = await getPost(id);
    setPost(result.data);
};
