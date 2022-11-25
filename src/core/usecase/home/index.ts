import { LIKE, POST } from "../../../types";
import {
    getAllPosts,
    getSearchedPosts,
    getSuggestion,
    postLike,
} from "../../domain/api/home/service";

export const postLikeInfo = async (
    postId: number,
    listOfPosts: POST[],
    setListOfPosts: React.Dispatch<React.SetStateAction<POST[]>>,
    likedPosts: number[],
    setLikedPosts: React.Dispatch<React.SetStateAction<number[]>>
) => {
    const result = await postLike(postId);
    // Likesカウンターリアルタイム切り替え
    setListOfPosts(
        listOfPosts.map((post: POST): any => {
            if (post.id === postId) {
                if (result.data.liked) {
                    // 配列Likesに数字(0)を１つ加えることでlengthの数を1増やす（数字ならなんでもOK）
                    return { ...post, Likes: [...post.Likes, 0] };
                } else {
                    const likesArray = post.Likes;
                    likesArray.pop();
                    return { ...post, Likes: likesArray };
                }
            } else {
                return post;
            }
        })
    );
    // Likesアイコン表示のリアルタイム切り替え
    if (likedPosts.includes(postId)) {
        setLikedPosts(
            likedPosts.filter((id: number) => {
                return id !== postId;
            })
        );
    } else {
        setLikedPosts([...likedPosts, postId]);
    }
};

export const getSuggestionInfo = async (
    setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
) => {
    const result = await getSuggestion();
    setSuggestions(result.data);
};

export const getSearchedPostsInfo = async (
    keyword: string,
    setListOfPosts: React.Dispatch<React.SetStateAction<POST[]>>,
    setLikedPosts: React.Dispatch<React.SetStateAction<number[]>>
) => {
    const result = await getSearchedPosts(keyword);
    setListOfPosts(result.data.searchPosts);
    // 単なるLiked投稿でなく、投稿の中のPostIdのみをmapで配列に入れる
    setLikedPosts(
        result.data.likedPosts.map((like: LIKE) => {
            return like.PostId;
        })
    );
};

export const getAllPostsInfo = async (
    setListOfPosts: React.Dispatch<React.SetStateAction<POST[]>>,
    setLikedPosts: React.Dispatch<React.SetStateAction<number[]>>
) => {
    const result = await getAllPosts();
    const posts = result.data.listOfPosts;
    setListOfPosts(posts);
    // 単なるLiked投稿でなく、投稿の中のPostIdのみをmapで配列に入れる
    setLikedPosts(
        result.data.likedPosts.map((like: LIKE) => {
            return like.PostId;
        })
    );
};
