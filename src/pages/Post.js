import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from 'react-router-dom'
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState("");
  const [listOfComments, setListOfComment] = useState([]);
  const [comment, setComment] = useState("");
  const { authState } = useContext(AuthContext);

  let history = useHistory();

  const addComment = () => {
      axios.post("https://fullstack-api-node.herokuapp.com/comments", {
          PostId: id,
          commentBody: comment
      },
      {
        headers: {
            "accessToken": localStorage.getItem("accessToken")
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

  const deleteComment = (commentId) => {
      axios.delete(`https://fullstack-api-node.herokuapp.com/comments/${commentId}`, {
          headers: {
            "accessToken": localStorage.getItem("accessToken")
          }
      })
      .then(() => {
          setListOfComment(listOfComments.filter((val) => {
              return val.id != commentId
          }));
      });
  };

  const deletePost = () => {
      axios.delete(`https://fullstack-api-node.herokuapp.com/posts/${id}`, {
          headers: {
              "accessToken": localStorage.getItem("accessToken")
          }
      })
      .then(() => {
          history.push("/");
      });
  };

  const editPost = (editType) => {
      if (editType === "title") {
          let newTitle = prompt("タイトルを入力してください");
          axios.put("https://fullstack-api-node.herokuapp.com/posts/title", {
              newTitle: newTitle,
              id: id
          },{
             headers: {
                "accessToken": localStorage.getItem("accessToken")
            }
          })
          setPostObject({ ...postObject, title: newTitle });
      } else {
          let newPostText = prompt("テキストを入力してください");
          axios.put("https://fullstack-api-node.herokuapp.com/posts/postText", {
              newPostText: newPostText,
              id: id
          },{
             headers: {
                "accessToken": localStorage.getItem("accessToken")
            }
          })
          setPostObject({ ...postObject, postText: newPostText });
      }
  };
  
  useEffect(() => {
      axios.get(`https://fullstack-api-node.herokuapp.com/posts/byId/${id}`)
      .then((response) => {
          setPostObject(response.data);
      });

      axios.get(`https://fullstack-api-node.herokuapp.com/comments/${id}`)
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
          >{postObject.postText}</div>
          <div className="footer">
              {postObject.username}
              {authState.username === postObject.username &&
               <button onClick={deletePost}>Delete Post</button>}
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
                onChange={(e)=> {
                    setComment(e.target.value);
                }}
                />
                <button onClick={addComment}> Add Comment</button>
            </div>
            <div className="listOfComments">
                {listOfComments.map((comment, key) => {
                    return (
                    <div className="comment" key={key}>
                        {comment.commentBody}
                        <label>Username: {comment.username}</label>
                        {authState.username === comment.username && (
                            <button onClick={() => {deleteComment(comment.id)}}> X</button>
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
