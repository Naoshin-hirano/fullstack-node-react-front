import { RELATIONSHIP, USER } from "../../../types";
import {
    getUser,
    getUserPosts,
    postFollowAndUnfollow,
} from "../../domain/api/profile/service";

// フォローとフォロー解除
export const postFollowAndUnfollowInfo = async (
    id: string,
    follower: any,
    setFollower: any,
    authState: any
) => {
    const result = await postFollowAndUnfollow(id);
    if (result.data.following) {
        setFollower([...follower, authState.id]);
    } else {
        setFollower(
            follower.filter((uid: number) => {
                return uid !== authState.id;
            })
        );
    }
};

// ユーザー情報取得
export const getUserInfo = async (
    id: string,
    setFollowing: any,
    setFollower: any,
    setUsername: any,
    setUserImage: any
) => {
    const result = await getUser(id);
    setFollowing(
        result.data.basicInfo.Relationships.map((relation: RELATIONSHIP) => {
            return relation.followed;
        })
    );
    setFollower(
        result.data.following.map((user: USER) => {
            return user.id;
        })
    );
    setUsername(result.data.basicInfo.username);
    setUserImage(result.data.basicInfo.imageName);
};

//　ユーザーによる投稿一覧取得
export const getUserPostsInfo = async (id: string, setListOfPosts: any) => {
    const result = await getUserPosts(id);
    setListOfPosts(result.data);
};
