import React, { useState } from "react";
import { SuggestionsListComponent } from "./SuggestionsListComponent";
import { Pagination } from "./Pagination";
import { Search } from "./Search";
import { CurrentPosts } from "./CurrentPosts";
import * as Usecase from "../../../../core/usecase/home";
import { mainProps } from "../../template/home";
import { Loading } from "../common/Loading";

export const Home = (props: mainProps) => {
    const {
        listOfPosts,
        setListOfPosts,
        likedPosts,
        setLikedPosts,
        suggestions,
        loading,
    } = props;

    const [inputText, setInputText] = useState<string>("");
    // inputへ入力したワードにひっかったsuggestions
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
        []
    );
    // inputへ入力したワードがsuggestionsにひっかかってるか
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    // 現在リストが表示されているページ
    const [currentPage, setCurrentPage] = useState<number>(1);
    // 1ページにいくつのリストを表示するか
    const [postsPerPage] = useState<number>(3);

    const likeAPost = (postId: number): void => {
        // bodyはオブジェクトなのでPostIdもオブジェクトにする
        Usecase.postLikeInfo(
            postId,
            listOfPosts,
            setListOfPosts,
            likedPosts,
            setLikedPosts
        );
    };

    // ワード検索でURLをクエリ用に更新→リロードされる→useEffect再実行される
    const searchByEnter = () => {
        // URLをkeywordに即して変更
        const params = {
            keyword: inputText,
        };
        const urlSearchParam = new URLSearchParams(params).toString();
        window.location.href = "/?" + urlSearchParam;
    };

    // オートサジェスチョンをクリックにて検索
    const searchBySuggest = (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLElement;
        const params = {
            keyword: input.innerText,
        };
        const urlSearchParam = new URLSearchParams(params).toString();
        window.location.href = "/?" + urlSearchParam;
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;
        // 全てのsuggestionsをinputに入力したワードにひっかかるsuggestionに絞り込む
        const unLinked = suggestions.filter(
            (suggestion: string) =>
                // toLowerCase: 文字列を小文字へ
                // suggestionsが1つ以上でるとき
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        setInputText(userInput);
        setFilteredSuggestions(unLinked);
        setShowSuggestions(true);
    };

    // suggestionを直接クリック後
    const onClick = (e: React.MouseEvent<HTMLInputElement>): void => {
        searchBySuggest(e);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
    };

    // 全てのリストから1ページに表示する数だけ切り取ったリストの取得
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = listOfPosts.slice(indexOfFirstPost, indexOfLastPost);

    // 表示するページを切り替え
    const paginate = (pageNum: number) => {
        setCurrentPage(pageNum);
    };
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <Search
                        onChange={onChange}
                        inputText={inputText}
                        searchByEnter={searchByEnter}
                    />
                    {showSuggestions && inputText && (
                        <SuggestionsListComponent
                            onClick={onClick}
                            filteredSuggestions={filteredSuggestions}
                        />
                    )}
                    <CurrentPosts
                        currentPosts={currentPosts}
                        likeAPost={likeAPost}
                        likedPosts={likedPosts}
                    />
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={listOfPosts.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            )}
        </>
    );
};
