import React, {useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import '../App.css';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    // 自分がLikeしたPost一覧
    const [likedPosts, setLikedPosts] = useState([]);
    
    let history = useHistory();

    const likeAPost = (postId) => {
        // bodyはオブジェクトなのでPostIdもオブジェクトにする
        axios.post("http://localhost:3001/likes",
            { PostId: postId },
            { headers: { "accessToken": localStorage.getItem("accessToken")}}
        ).then((response) => {
            // Likesカウンターリアルタイム切り替え
            setListOfPosts(
                listOfPosts.map((post) => {
                    if (post.id === postId) {
                        if (response.data.liked) {
                            // 配列Likesに数字(0)を１つ加えることでlengthの数を1増やす（数字ならなんでもOK）
                            return { ...post, Likes: [...post.Likes, 0]};
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
                setLikedPosts(likedPosts.filter((id) => {
                    return id != postId
                }));
            } else {
                setLikedPosts([...likedPosts, postId]);
            }
        });
    };

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        } else {
            axios.get("http://localhost:3001/posts", 
            { headers: { "accessToken": localStorage.getItem("accessToken")}})
            .then(response => {
                setListOfPosts(response.data.listOfPosts);
                // 単なるLiked投稿でなく、投稿の中のPostIdのみをmapで配列に入れる
                setLikedPosts(response.data.likedPosts.map((like) => {
                    return like.PostId
                }));
            });
        };
    }, []);
    return (
    <div>
        {listOfPosts.map((value, key) => {
            return (
                <div key={key} className="post">
                  <div className="title">{value.title}</div>
                  <div className="body" onClick={() => {history.push(`/post/${value.id}`)}}>{value.postText}</div>
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
                        {value.Tags.map((tag, key) => {
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
        })}
    </div>
  )
}

export default Home