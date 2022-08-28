import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import '../App.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import SearchIcon from '@material-ui/icons/Search';
import { SuggestionsListComponent } from '../Components/SuggestionsListComponent';
import { Pagination } from '../Components/Pagination';

interface LIKE {
    PostId: number;
    UserId: number;
    createdAt: string;
    id: number;
    updatedAt: string;
}

interface POST_TAG {
    PostId: number;
    TagId: number;
    createAt: string;
    updatedAt: string;
}

interface TAG {
    PostTag: POST_TAG;
    createdAt: string;
    id: number;
    tag_name: string;
    updatedAt: string;
}

interface POST {
    Likes: LIKE[];
    Tags: TAG[];
    UserId: number;
    createdAt: string;
    id: number;
    imageName: string;
    postText: string;
    title: string;
    updatedAt: string;
    username: string;
}

function Home() {
    const [listOfPosts, setListOfPosts] = useState<POST[]>([]);
    // 自分がLikeしたPost一覧
    const [likedPosts, setLikedPosts] = useState<number[]>([]);
    const [inputText, setInputText] = useState<string>("");
    // inputへ入力したワードにひっかったsuggestions
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    // inputへ入力したワードがsuggestionsにひっかかってるか
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    // 検索窓でのサジェスチョン一覧
    const [suggestions, setSuggestions] = useState<string[]>([]);
    // 現在リストが表示されているページ
    const [currentPage, setCurrentPage] = useState<number>(1);
    // 1ページにいくつのリストを表示するか
    const [postsPerPage] = useState<number>(3);

    let history = useHistory();

    const likeAPost = (postId: number) => {
        // bodyはオブジェクトなのでPostIdもオブジェクトにする
        axios.post("http://localhost:3001/likes",
            { PostId: postId },
            { headers: { "accessToken": localStorage.getItem("accessToken") as string } }
        ).then((response) => {
            // Likesカウンターリアルタイム切り替え
            setListOfPosts(
                listOfPosts.map((post: POST): any => {
                    if (post.id === postId) {
                        if (response.data.liked) {
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
                setLikedPosts(likedPosts.filter((id: number) => {
                    return id != postId
                }));
            } else {
                setLikedPosts([...likedPosts, postId]);
            }
        });
    };

    // ワード検索でURLをクエリ用に更新→リロードされる→useEffect再実行される
    const searchByEnter = () => {
        // URLをkeywordに即して変更
        const params = {
            keyword: inputText
        }
        const urlSearchParam = new URLSearchParams(params).toString();
        window.location.href = "/?" + urlSearchParam
    };

    const searchBySuggest = (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLElement;
        const params = {
            keyword: input.innerText
        }
        const urlSearchParam = new URLSearchParams(params).toString();
        window.location.href = "/?" + urlSearchParam
    }

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
        setCurrentPage(pageNum)
    };

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        } else {
            // 検索窓でのサジェスチョン一覧を取得
            axios.get("http://localhost:3001/posts/suggests")
                .then((response) => {
                    setSuggestions(response.data);
                });

            // URLが検索窓で入力したワードのクエリになっているかの判断
            const queryParams = new URLSearchParams(window.location.search);
            const keyword = queryParams.get("keyword")
            if (keyword) {
                // 検索ワードでの絞り込み投稿一覧
                axios.get(`http://localhost:3001/posts/search/${keyword}`,
                    { headers: { "accessToken": localStorage.getItem("accessToken") as string } })
                    .then(response => {
                        setListOfPosts(response.data.searchPosts);
                        // 単なるLiked投稿でなく、投稿の中のPostIdのみをmapで配列に入れる
                        setLikedPosts(response.data.likedPosts.map((like: LIKE) => {
                            return like.PostId
                        }));
                    });
            } else {
                // 絞り込みなしでの投稿一覧
                axios.get("http://localhost:3001/posts",
                    { headers: { "accessToken": localStorage.getItem("accessToken") as string } })
                    .then(response => {
                        const posts = response.data.listOfPosts;
                        setListOfPosts(posts);
                        // 単なるLiked投稿でなく、投稿の中のPostIdのみをmapで配列に入れる
                        setLikedPosts(response.data.likedPosts.map((like: LIKE) => {
                            return like.PostId
                        }));
                    });
            }
        };
    }, []);
    return (
        <div>
            <div className="search">
                <div className='search__bar'>
                    <SearchIcon />
                    <input
                        type="text"
                        className="search__bar__input"
                        placeholder="Search"
                        autoComplete="off"
                        name="search"
                        value={inputText}
                        onKeyPress={e => {
                            if (e.key == 'Enter') {
                                searchByEnter();
                            }
                        }}
                        onChange={onChange} />
                </div>
            </div>
            {showSuggestions && inputText && (
                <SuggestionsListComponent
                    onClick={onClick}
                    filteredSuggestions={filteredSuggestions}
                />
            )}
            {currentPosts && (currentPosts.map((value: POST, key: number) => {
                return (
                    <div key={key} className="post">
                        <div className="title">{value.title}</div>
                        <div className="body" onClick={() => { history.push(`/post/${value.id}`) }}>
                            {value.postText}
                            <img
                                src={`http://localhost:3000/${value.imageName}`}
                                alt="imageName"
                                style={{ width: 211, height: 141 }} />
                        </div>
                        <div className="footer">
                            <div className="postInfo">
                                <div className="username">
                                    <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
                                </div>
                                <div className="buttons">
                                    <ThumbUpAltIcon
                                        onClick={() => {
                                            likeAPost(value.id);
                                        }}
                                        className={
                                            likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                                        }
                                    />
                                    <label> {value.Likes.length}</label>
                                </div>
                            </div>
                            <div className="tags">
                                {value.Tags.map((tag: TAG, key: number) => {
                                    return (
                                        <Link key={key} to={`/post/hashtag/${tag.tag_name}`}>
                                            <div>#{tag.tag_name}</div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            }))}
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={listOfPosts.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    )
}

export default Home