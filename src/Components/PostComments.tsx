import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { COMMENT, AUTH_STATE } from "../types";

interface POST_COMMENTS_PROPS {
    id: string;
    authState: AUTH_STATE;
}

export const PostComments = ({ id, authState }: POST_COMMENTS_PROPS) => {
    const { data, error } = useSWR(`http://localhost:3001/comments/${id}`, {
        refreshInterval: 1000,
    });
    const [comment, setComment] = useState<string>("");

    const addComment = () => {
        axios
            .post(
                "http://localhost:3001/comments",
                {
                    PostId: id,
                    commentBody: comment,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem(
                            "accessToken"
                        ) as string,
                    },
                }
            )
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                }
                setComment("");
            });
    };

    const deleteComment = (commentId: string) => {
        axios.delete(`http://localhost:3001/comments/${commentId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken") as string,
            },
        });
    };

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
                {data ? (
                    data.map((comment: COMMENT, key: number) => {
                        return (
                            <div className="comment" key={key}>
                                {comment.commentBody}
                                <label>Username: {comment.username}</label>
                                {authState.username === comment.username && (
                                    <button
                                        onClick={() => {
                                            deleteComment(comment.id);
                                        }}
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <h1>{error}</h1>
                )}
            </div>
        </div>
    );
};
