import { useState } from "react";
import { useHistory } from "react-router-dom";
import { PostComments } from "./PostComments";
import { PostDetail } from "./PostDetail";
import * as Usecase from "../../../../core/usecase/post";
import { mainProps } from "../../template/post";

export const Post = (props: mainProps) => {
    const [comment, setComment] = useState<string>("");
    let history = useHistory();
    const { id, authState, comments, post, setComments } = props;

    const addComment = async () => {
        const result = await Usecase.postAddCommentInfo(id, comment);
        setComments([...comments, result.data]);
        setComment("");
    };

    const deleteComment = async (commentId: string, index: number) => {
        await Usecase.deleteCommentInfo(commentId);
        const newComments = [...comments];
        newComments.splice(index, 1);
        setComments(newComments);
    };

    const deletePost = async () => {
        await Usecase.deletePostInfo(id);
        history.push("/");
    };

    const editPost = (editType: string) => {
        Usecase.putEditPostInfo(editType, id);
    };

    return (
        <div className="postPage">
            <PostDetail
                post={post}
                authState={authState}
                deletePost={deletePost}
                editPost={editPost}
            />
            <PostComments
                comment={comment}
                setComment={setComment}
                authState={authState}
                comments={comments}
                addComment={addComment}
                deleteComment={deleteComment}
            />
        </div>
    );
};
