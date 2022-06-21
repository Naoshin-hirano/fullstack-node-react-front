import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState("");
  const [listOfComments, setListOfComment] = useState([]);
  const [comment, setComment] = useState("");
  const { authState } = useContext(AuthContext);

  const addComment = () => {
      axios.post("http://localhost:3001/comments", {
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
      axios.delete(`http://localhost:3001/comments/${commentId}`, {
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
  
  useEffect(() => {
      axios.get(`http://localhost:3001/posts/byId/${id}`)
      .then((response) => {
          setPostObject(response.data);
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
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
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
