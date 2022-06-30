import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  let { id } = useParams();
  let history = useHistory();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
      axios.get(`https://fullstack-api-node.herokuapp.com/auth/basicInfo/${id}`)
      .then((response) => {
          setUsername(response.data.username);
      });

      axios.get(`https://fullstack-api-node.herokuapp.com/posts/byuserId/${id}`)
      .then((response) => {
          setListOfPosts(response.data);
      });
  }, [id]);
  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
          <h1> Username: {username}</h1>
          {authState.username === username && (
              <button onClick={() => {history.push("/changepassword")}}>Update Password</button>
          )}
      </div>
      <div className="listOfPosts">
      {listOfPosts.map((value, key) => {
            return (
                <div key={key} className="post">
                  <div className="title">{value.title}</div>
                  <div className="body" onClick={() => {history.push(`/post/${value.id}`)}}>{value.postText}</div>
                  <div className="footer">
                  <div className="username">{value.username}</div>
                  <div className="buttons">
                      <label> {value.Likes.length}</label>
                  </div>
                  </div>
                </div>
            )
        })};
      </div>
    </div>
  )
}

export default Profile
