import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
    // 自分が画面userをフォローしているかどうか
    // 画面のuserがフォローしている人数　＋　画面のuserのフォロワー
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const [following, setFollowing] = useState([]);
    const [follower, setFollower] = useState([]);
    let { id } = useParams();
    let history = useHistory();
    const { authState } = useContext(AuthContext);

    const onFollow = () => {
        axios.post("http://localhost:3001/relationships", {
            "followedId": id
        },
            { headers: { "accessToken": localStorage.getItem("accessToken") } }
        ).then((response) => {
            if (response.data.following) {
                setFollower([...follower, authState.id]);
            } else {
                setFollower(follower.filter((uid) => {
                    return uid != authState.id
                }));
            }
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicInfo/${id}`)
            .then((response) => {
                setFollowing(response.data.basicInfo.Relationships.map((relation => {
                    return relation.followed
                })));
                setFollower(response.data.following.map((user) => {
                    return user.id
                }));
                setUsername(response.data.basicInfo.username);
            });

        axios.get(`http://localhost:3001/posts/byuserId/${id}`)
            .then((response) => {
                setListOfPosts(response.data);
            });
    }, [id]);
    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1> Username: {username}</h1>
                <p>フォロワー:  {follower.length}</p>
                <p>フォロー中: {following.length}</p>
                {authState.username === username ? (
                    <button onClick={() => { history.push("/changepassword") }}>Update Password</button>) : (
                        follower.includes(authState.id) ? (
                            <button onClick={onFollow}>フォロー解除する</button>
                        ) : (
                                <button onClick={onFollow}>フォローする</button>
                            )
                    )
                }
            </div>
            <div className="listOfPosts">
                {listOfPosts.map((value, key) => {
                    return (
                        <div key={key} className="post">
                            <div className="title">{value.title}</div>
                            <div className="body" onClick={() => { history.push(`/post/${value.id}`) }}>
                                {value.postText}
                                <img
                                    src={`http://localhost:3000/${value.imageName}`}
                                    alt="imageName"
                                    style={{ width: 211, height: 141 }} />
                            </div>
                            <div className="footer">
                                <div className="postInfo">
                                    <div className="username">{value.username}</div>
                                    <div className="buttons">
                                        <label> {value.Likes.length}</label>
                                    </div>
                                </div>
                                <div className="tags">
                                    {value.Tags.map((tag, key) => {
                                        return (
                                            <div key={key}>#{tag.tag_name}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile
