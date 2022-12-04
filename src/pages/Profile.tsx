import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
    // 自分が画面userをフォローしているかどうか
    // 画面のuserがフォローしている人数　＋　画面のuserのフォロワー
    const [username, setUsername] = useState<any>("");
    const [listOfPosts, setListOfPosts] = useState<any>([]);
    const [following, setFollowing] = useState<any>([]);
    const [follower, setFollower] = useState<any>([]);
    let { id } = useParams<any>();
    let history = useHistory();
    const { authState } = useContext<any>(AuthContext);

    const onFollow = () => {
        axios
            .post(
                "https://fullstack-api-node.herokuapp.com/relationships",
                {
                    followedId: id,
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
                if (response.data.following) {
                    setFollower([...follower, authState.id]);
                } else {
                    setFollower(
                        follower.filter((uid: any) => {
                            return uid != authState.id;
                        })
                    );
                }
            });
    };

    useEffect(() => {
        axios
            .get(
                `https://fullstack-api-node.herokuapp.com/auth/basicInfo/${id}`
            )
            .then((response) => {
                setFollowing(
                    response.data.basicInfo.Relationships.map(
                        (relation: any) => {
                            return relation.followed;
                        }
                    )
                );
                setFollower(
                    response.data.following.map((user: any) => {
                        return user.id;
                    })
                );
                setUsername(response.data.basicInfo.username);
            });

        axios
            .get(
                `https://fullstack-api-node.herokuapp.com/posts/byuserId/${id}`
            )
            .then((response) => {
                setListOfPosts(response.data);
            });
    }, [id]);
    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1> Username: {username}</h1>
                <p>フォロワー: {follower.length}</p>
                <p>フォロー中: {following.length}</p>
                {authState.username === username ? (
                    <button
                        onClick={() => {
                            history.push("/changepassword");
                        }}
                    >
                        Update Password
                    </button>
                ) : follower.includes(authState.id) ? (
                    <button onClick={onFollow}>フォロー解除する</button>
                ) : (
                    <button onClick={onFollow}>フォローする</button>
                )}
            </div>
            <div className="listOfPosts">
                {listOfPosts.map((value: any, key: any) => {
                    return (
                        <div key={key} className="post">
                            <div className="title">{value.title}</div>
                            <div
                                className="body"
                                onClick={() => {
                                    history.push(`/post/${value.id}`);
                                }}
                            >
                                {value.postText}
                                <img
                                    src={`http://localhost:3000/${value.imageName}`}
                                    alt="imageName"
                                    style={{ width: 211, height: 141 }}
                                />
                            </div>
                            <div className="footer">
                                <div className="postInfo">
                                    <div className="username">
                                        {value.username}
                                    </div>
                                    <div className="buttons">
                                        <label> {value.Likes.length}</label>
                                    </div>
                                </div>
                                <div className="tags">
                                    {value.Tags.map((tag: any, key: any) => {
                                        return (
                                            <div key={key}>#{tag.tag_name}</div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Profile;
