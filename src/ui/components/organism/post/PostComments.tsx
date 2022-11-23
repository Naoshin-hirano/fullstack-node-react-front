import { COMMENT, AUTH_STATE } from "../../../../types";

interface POST_COMMENTS_PROPS {
    comment: string;
    setComment: any;
    authState: AUTH_STATE;
    comments: any;
    addComment: any;
    deleteComment: any;
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
                    value={comment}
                    onChange={(e) => {
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
