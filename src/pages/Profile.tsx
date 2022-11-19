import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { TAG, POST, RELATIONSHIP, USER } from "../types";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

function Profile() {
    // 自分が画面userをフォローしているかどうか
    // 画面のuserがフォローしている人数　＋　画面のuserのフォロワー
    const [username, setUsername] = useState<string>("");
    const [userImage, setUserImage] = useState<string>("");
    const [listOfPosts, setListOfPosts] = useState<POST[]>([]);
    const [following, setFollowing] = useState<number[]>([]);
    const [follower, setFollower] = useState<number[]>([]);
    let { id } = useParams<{ id: string }>();
    let history = useHistory();
    const { authState } = useContext(AuthContext);

    const onFollow = () => {
        axios
            .post(
                "http://localhost:3001/relationships",
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
                        follower.filter((uid: number) => {
                            return uid !== authState.id;
                        })
                    );
                }
            });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3001/auth/basicInfo/${id}`)
            .then((response) => {
                setFollowing(
                    response.data.basicInfo.Relationships.map(
                        (relation: RELATIONSHIP) => {
                            return relation.followed;
                        }
                    )
                );
                setFollower(
                    response.data.following.map((user: USER) => {
                        return user.id;
                    })
                );
                setUsername(response.data.basicInfo.username);
                setUserImage(response.data.basicInfo.imageName);
            });

        axios
            .get(`http://localhost:3001/posts/byuserId/${id}`)
            .then((response) => {
                setListOfPosts(response.data);
            });
    }, [id]);
    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1>
                    {username}
                    {String(authState.id) !== id && (
                        <MailOutlineIcon
                            style={{ marginLeft: "25px", fontSize: "30px" }}
                            onClick={() => {
                                history.push(`/directmessage/${id}`);
                            }}
                        />
                    )}
                </h1>
                {userImage ? (
                    <img
                        src={`http://localhost:3000/${userImage}`}
                        alt="profileImage"
                        style={{ width: 211 }}
                        className="profileImage"
                    />
                ) : (
                    <img
                        src={
                            "https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-vector-icon-white-transparent-background-png-image_1978010.jpg"
                        }
                        alt="profileImage"
                        style={{ width: 211 }}
                        className="profileImage"
                    />
                )}
                <p>フォロワー: {follower.length}</p>
                <p>フォロー中: {following.length}</p>
                {authState.username === username ? (
                    <button
                        onClick={() => {
                            history.push("/changeprofile");
                        }}
                    >
                        Update Profile
                    </button>
                ) : follower.includes(authState.id) ? (
                    <button onClick={onFollow}>フォロー解除する</button>
                ) : (
                    <button onClick={onFollow}>フォローする</button>
                )}
            </div>
            <div className="listOfPosts">
                {listOfPosts.map((value: POST, key: number) => {
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
                                    {value.Tags.map((tag: TAG, key: number) => {
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
