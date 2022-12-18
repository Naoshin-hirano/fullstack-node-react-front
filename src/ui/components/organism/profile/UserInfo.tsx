import { useHistory } from "react-router-dom";
import { AUTH_STATE } from "../../../../types";

interface USER_INFO_PROPS {
    authState: AUTH_STATE;
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
                    <button
                        onClick={() => {
                            history.push(`/directmessage/${id}`);
                        }}
                    >
                        ユーザーにDMを送る
                    </button>
                )}
            </h1>
            <img src={userImage} alt="profileImage" className="profileImage" />
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
