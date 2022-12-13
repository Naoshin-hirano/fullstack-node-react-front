import { useState } from "react";
import { useHistory } from "react-router-dom";
import { PostComments } from "./PostComments";
import { PostDetail } from "./PostDetail";
import * as Usecase from "../../../../core/usecase/post";
import { mainProps } from "../../template/post";
import { EditModal } from "./EditModal";
import { DeleteModal } from "./DeleteModal";
import { Loading } from "../common/Loading";

export const Post = (props: mainProps) => {
    const [comment, setComment] = useState<string>("");
    const [isEditOpen, setEditOpenModal] = useState(false);
    const [isDeleteOpen, setDeleteOpenModal] = useState(false);
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
        setEditOpenModal(false);
    };

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div className="postPage">
                    <PostDetail
                        post={post}
                        authState={authState}
                        setEditOpenModal={setEditOpenModal}
                        setDeleteOpenModal={setDeleteOpenModal}
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
            {isEditOpen && (
                <>
                    <div
                        id="overlay"
                        onClick={() => setEditOpenModal(false)}
                    ></div>
                    <EditModal onSubmit={onSubmit} post={post} />
                </>
            )}
            {isDeleteOpen && (
                <>
                    <div
                        id="overlay"
                        onClick={() => setDeleteOpenModal(false)}
                    ></div>
                    <DeleteModal
                        setDeleteOpenModal={setDeleteOpenModal}
                        deletePost={deletePost}
                    />
                </>
            )}
        </div>
    );
};
