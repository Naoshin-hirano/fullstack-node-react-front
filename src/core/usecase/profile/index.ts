import { Dispatch, SetStateAction } from "react";
import { AUTH_STATE, POST, RELATIONSHIP, USER } from "../../../types";
import {
    getUser,
    getUserPosts,
    postFollowAndUnfollow,
} from "../../domain/api/profile/service";

// フォローとフォロー解除
export const postFollowAndUnfollowInfo = async (
    id: string,
    follower: number[],
    setFollower: Dispatch<SetStateAction<number[]>>,
    authState: AUTH_STATE
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
    setFollowing: Dispatch<SetStateAction<number[]>>,
    setFollower: Dispatch<SetStateAction<number[]>>,
    setUsername: Dispatch<SetStateAction<string>>,
    setUserImage: Dispatch<SetStateAction<string>>
) => {
    const result = await getUser(id);
    setFollowing(
        result.data.followed.map((user: USER) => {
            return user.id;
        })
    );
    setFollower(
        result.data.following.map((user: USER) => {
            return user.id;
        })
    );
    setUsername(result.data.userBasicInfo.username);
    setUserImage(result.data.userBasicInfo.imageName);
};

//　ユーザーによる投稿一覧取得
export const getUserPostsInfo = async (
    id: string,
    setListOfPosts: Dispatch<SetStateAction<POST[]>>
) => {
    const result = await getUserPosts(id);
    setListOfPosts(result.data);
};
