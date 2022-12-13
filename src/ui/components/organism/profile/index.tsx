import * as Usecase from "../../../../core/usecase/profile";
import { UserInfo } from "./UserInfo";
import { PostsByUser } from "./PostsByUser";
import { mainProps } from "../../template/profile";
import { Loading } from "../common/Loading";

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
                <Loading />
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
