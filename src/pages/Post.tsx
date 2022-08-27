import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from 'react-router-dom'
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
    let { id } = useParams<any>();
    const [postObject, setPostObject] = useState<any>("");
    const [tagsList, setTagsList] = useState<any>([]);
    const [listOfComments, setListOfComment] = useState<any>([]);
    const [comment, setComment] = useState<any>("");
    const [image, setImage] = useState<any>("");
    const { authState } = useContext<any>(AuthContext);

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
                } else {
                    const commentToAdd = {
                        commentBody: comment,
                        username: response.data.username
                    };
                    setListOfComment([...listOfComments, commentToAdd]);
                    setComment("");
                }
            });
    };

    const deleteComment = (commentId: any) => {
        axios.delete(`http://localhost:3001/comments/${commentId}`, {
            headers: {
                "accessToken": localStorage.getItem("accessToken") as string
            }
        })
            .then(() => {
                setListOfComment(listOfComments.filter((val: any) => {
                    return val.id != commentId
                }));
            });
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

    const editPost = (editType: any) => {
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

        axios.get(`http://localhost:3001/comments/${id}`)
            .then((response) => {
                setListOfComment(response.data);
            });
    }, []);
    return (
        <div className="postPage">
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
                                tagsList.map((tag: any, key: any) => {
                                    return <div key={key}>#{tag.tag_name}</div>
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
                    {listOfComments.map((comment: any, key: any) => {
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
