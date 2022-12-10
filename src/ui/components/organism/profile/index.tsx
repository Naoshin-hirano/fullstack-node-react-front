import * as Usecase from "../../../../core/usecase/profile";
import { UserInfo } from "./UserInfo";
import { PostsByUser } from "./PostsByUser";
import { mainProps } from "../../template/profile";
import BeatLoader from "react-spinners/BeatLoader";

export const Profile = (props: mainProps) => {
    const {
        authState,
        username,
        userImage,
        listOfPosts,
        following,
        follower,
        setFollower,
        id,
        loading,
    } = props;

    const onFollow = () => {
        Usecase.postFollowAndUnfollowInfo(id, follower, setFollower, authState);
    };
    return (
        <div>
            {loading ? (
                <BeatLoader color="#36d7b7" />
            ) : (
                <div className="profilePageContainer">
                    <UserInfo
                        authState={authState}
                        username={username}
                        userImage={userImage}
                        follower={follower}
                        following={following}
                        id={id}
                        onFollow={onFollow}
                    />
                    <PostsByUser listOfPosts={listOfPosts} />
                </div>
            )}
        </div>
    );
};
