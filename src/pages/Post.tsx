import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from 'react-router-dom'
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import useSWR from "swr";

interface POST_TAG {
    PostId: number;
    TagId: number;
    createAt: string;
    updatedAt: string;
}

interface TAG {
    PostTag: POST_TAG;
    createdAt: string;
    id: number;
    tag_name: string;
    updatedAt: string;
}

interface COMMENT {
    id: string;
    commentBody: string;
    username: string;
}

function Post() {
    let { id } = useParams<{ id: string }>();
    const [postObject, setPostObject] = useState<any>();
    const [tagsList, setTagsList] = useState<TAG[]>([]);
    const [comment, setComment] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const { authState } = useContext(AuthContext);
    const { data, error } = useSWR(`http://localhost:3001/comments/${id}`, { refreshInterval: 1000 });

    let history = useHistory();

    const addComment = () => {
        axios.post("http://localhost:3001/comments", {
            PostId: id,
            commentBody: comment
        },
            {
                headers: {
                    "accessToken": localStorage.getItem("accessToken") as string
                }
            })
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
                "accessToken": localStorage.getItem("accessToken") as string
            }
        })
    };

    const deletePost = () => {
        axios.delete(`http://localhost:3001/posts/${id}`, {
            headers: {
                "accessToken": localStorage.getItem("accessToken") as string
            }
        })
            .then(() => {
                history.push("/");
            });
    };

    const editPost = (editType: string) => {
        if (editType === "title") {
            let newTitle = prompt("タイトルを入力してください");
            axios.put("http://localhost:3001/posts/title", {
                newTitle: newTitle,
                id: id
            }, {
                headers: {
                    "accessToken": localStorage.getItem("accessToken") as string
                }
            })
            setPostObject({ ...postObject, title: newTitle });
        } else {
            let newPostText = prompt("テキストを入力してください");
            axios.put("http://localhost:3001/posts/postText", {
                newPostText: newPostText,
                id: id
            }, {
                headers: {
                    "accessToken": localStorage.getItem("accessToken") as string
                }
            })
            setPostObject({ ...postObject, postText: newPostText });
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`)
            .then((response) => {
                setPostObject(response.data);
                setTagsList(response.data.Tags);
                setImage(response.data.imageName);
            });
    }, []);
    return (
        <div className="postPage">
            {postObject &&
                <div className="leftSide">
                    <div className="post" id="individual">
                        <div
                            className="title"
                            onClick={() => {
                                if (authState.username === postObject.username) {
                                    editPost("title")
                                }
                            }}
                        > {postObject.title} </div>
                        <div
                            className="body"
                            onClick={() => {
                                if (authState.username === postObject.username) {
                                    editPost("body")
                                }
                            }}
                        >{postObject.postText}
                            <img
                                src={`http://localhost:3000/${image}`} alt=""
                                style={{ width: 336, height: 224, marginTop: 10 }} />
                        </div>
                        <div className="footer">
                            <div className="footerContent">
                                {postObject.username}
                                {authState.username === postObject.username &&
                                    <button onClick={deletePost}>Delete Post</button>}
                            </div>
                            <div className="tags">
                                {tagsList.length > 0 && (
                                    tagsList.map((tag: TAG, key: number) => {
                                        return <div key={key}>#{tag.tag_name}</div>
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>}
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
                    {data && data.map((comment: COMMENT, key: number) => {
                        return (
                            <div className="comment" key={key}>
                                {comment.commentBody}
                                <label>Username: {comment.username}</label>
                                {authState.username === comment.username && (
                                    <button onClick={() => { deleteComment(comment.id) }}> X</button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post
