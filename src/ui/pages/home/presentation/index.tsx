import { useEffect, useState } from "react";
import { POST } from "../../../../types";
import * as Usecase from "../../../../core/usecase/home";
import { useHistory } from "react-router-dom";

export const useCreateProps = () => {
    // 投稿一覧
    const [listOfPosts, setListOfPosts] = useState<POST[]>([]);
    // 自分がLikeしたPost一覧
    const [likedPosts, setLikedPosts] = useState<number[]>([]);
    // 検索窓でのサジェスチョン一覧
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {
        setLoading(true);
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        } else {
            // 検索窓でのサジェスチョン一覧を取得
            Usecase.getSuggestionInfo(setSuggestions);

            // URLが検索窓で入力したワードのクエリになっているかの判断
            const queryParams = new URLSearchParams(window.location.search);
            const keyword = queryParams.get("keyword");
            if (keyword) {
                // 検索ワードでの絞り込み投稿一覧
                Usecase.getSearchedPostsInfo(
                    keyword,
                    setListOfPosts,
                    setLikedPosts
                );
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } else {
                // 絞り込みなしでの投稿一覧
                Usecase.getAllPostsInfo(setListOfPosts, setLikedPosts);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
    }, [history]);

    return {
        listOfPosts,
        setListOfPosts,
        likedPosts,
        setLikedPosts,
        suggestions,
        setSuggestions,
        loading,
    };
};
