import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useHistory } from "react-router-dom";
import { AuthState } from "../../../../App";

interface USER_INFO_PROPS {
    authState: AuthState;
    username: string;
    userImage: string;
    follower: number[];
    following: number[];
    id: string;
    onFollow: () => void;
}

export const UserInfo = ({
    authState,
    username,
    userImage,
    follower,
    following,
    id,
    onFollow,
}: USER_INFO_PROPS) => {
    let history = useHistory();
    return (
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
                    プロフィールを編集する
                </button>
            ) : follower.includes(authState.id) ? (
                <button onClick={onFollow}>フォロー解除する</button>
            ) : (
                <button onClick={onFollow}>フォローする</button>
            )}
        </div>
    );
};
