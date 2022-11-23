import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
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
                    placeholder="Comment..."
                    autoComplete="off"
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                />
                <button onClick={addComment}> Add Comment</button>
            </div>
            <div className="listOfComments">
                {comments &&
                    comments.map((comment: COMMENT, index: number) => {
                        return (
                            <div className="comment" key={index}>
                                {comment.commentBody}
                                <label>Username: {comment.username}</label>
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
