import axios from "axios";

// フォローとフォロー解除
export const postFollowAndUnfollow = async (id: string) => {
    const response = await axios.post(
        "http://localhost:3001/relationships",
        {
            followedId: id,
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken") as string,
            },
        }
    );
    return response;
};

// ユーザー情報取得
export const getUser = async (id: string) => {
    const response = await axios.get(
        `http://localhost:3001/auth/basicInfo/${id}`
    );
    return response;
};

// ユーザーによる投稿一覧取得
export const getUserPosts = async (id: string) => {
    const response = await axios.get(
        `http://localhost:3001/posts/byuserId/${id}`
    );
    return response;
};
