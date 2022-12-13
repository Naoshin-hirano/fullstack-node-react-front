import { useState } from "react";
import { useHistory } from "react-router-dom";
import { PostComments } from "./PostComments";
import { PostDetail } from "./PostDetail";
import * as Usecase from "../../../../core/usecase/post";
import { mainProps } from "../../template/post";
import BeatLoader from "react-spinners/BeatLoader";
import { EditModal } from "./EditModal";

export const Post = (props: mainProps) => {
    const [comment, setComment] = useState<string>("");
    const [isOpen, setOpenModal] = useState(false);
    let history = useHistory();
    const {
        id,
        authState,
        comments,
        post,
        setPost,
        setComments,
        loading,
    } = props;

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

    const onSubmit = async (data: any) => {
        const result = await Usecase.putEditPostInfo(data, id);
        if (post) {
            setPost({
                ...post,
                title: result.data.title,
                postText: result.data.postText,
            });
        }
        setOpenModal(false);
    };

    return (
        <div>
            {loading ? (
                <BeatLoader color="#36d7b7" />
            ) : (
                <div className="postPage">
                    <PostDetail
                        post={post}
                        authState={authState}
                        deletePost={deletePost}
                        setOpenModal={setOpenModal}
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
            )}
            {isOpen && (
                <>
                    <div id="overlay" onClick={() => setOpenModal(false)}></div>
                    <EditModal onSubmit={onSubmit} post={post} />
                </>
            )}
        </div>
    );
};
