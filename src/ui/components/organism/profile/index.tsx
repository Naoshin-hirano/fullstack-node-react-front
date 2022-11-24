import * as Usecase from "../../../../core/usecase/profile";
import { UserInfo } from "./UserInfo";
import { PostsByUser } from "./PostsByUser";

export const Profile = (props: any) => {
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
    );
};
