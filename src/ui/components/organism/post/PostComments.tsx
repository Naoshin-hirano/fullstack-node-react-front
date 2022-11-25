import { Dispatch, SetStateAction } from "react";
import { COMMENT, AUTH_STATE } from "../../../../types";

interface POST_COMMENTS_PROPS {
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    authState: AUTH_STATE;
    comments: COMMENT[];
    addComment: () => void;
    deleteComment: (commentId: string, index: number) => void;
}

export const PostComments = ({
    comment,
    setComment,
    authState,
    comments,
    addComment,
    deleteComment,
}: POST_COMMENTS_PROPS) => {
    return (
        <div className="rightSide">
            <div className="addCommentContainer">
                <input
                    type="text"
                    placeholder="コメント..."
                    autoComplete="off"
                    value={comment as any}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setComment(e.target.value);
                    }}
                />
                <button onClick={addComment}> コメントを追加する</button>
            </div>
            <div className="listOfComments">
                {comments &&
                    comments.map((comment: COMMENT, index: number) => {
                        return (
                            <div className="comment" key={index}>
                                {comment.commentBody}
                                <label>ユーザー名: {comment.username}</label>
                                {authState.username === comment.username && (
                                    <button
                                        onClick={() => {
                                            deleteComment(comment.id, index);
                                        }}
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
