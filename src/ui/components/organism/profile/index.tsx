import { useHistory } from "react-router-dom";
import { TAG, POST } from "../../../../types";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import * as Usecase from "../../../../core/usecase/profile";

export const Profile = (props: any) => {
    let history = useHistory();
    const {
        authState,
        username,
        userImage,
        listOfPosts,
        following,
        follower,
        setFollower,
        id,
    } = props;

    const onFollow = () => {
        Usecase.postFollowAndUnfollowInfo(id, follower, setFollower, authState);
    };
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
};
