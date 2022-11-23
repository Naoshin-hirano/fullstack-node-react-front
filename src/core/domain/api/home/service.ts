import axios from "axios";

// いいね投稿と解除
export const postLike = async (postId: number) => {
    const response = await axios.post(
        "http://localhost:3001/likes",
        { PostId: postId },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken") as string,
            },
        }
    );
    return response;
};

// 検索候補一覧を取得
export const getSuggestion = async () => {
    const response = await axios.get("http://localhost:3001/posts/suggests");
    return response;
};

// 検索候補で選んだ投稿を取得
export const getSearchedPosts = async (keyword: any) => {
    const response = await axios.get(
        `http://localhost:3001/posts/search/${keyword}`,
        {
            headers: {
                accessToken: localStorage.getItem("accessToken") as string,
            },
        }
    );
    return response;
};

// 全ての投稿を取得
export const getAllPosts = async () => {
    const response = await axios.get("http://localhost:3001/posts", {
        headers: {
            accessToken: localStorage.getItem("accessToken") as string,
        },
    });
    return response;
};
