import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { TAG, POST } from '../types';

function TagPosts() {
    // 自分が画面userをフォローしているかどうか
    // 画面のuserがフォローしている人数　＋　画面のuserのフォロワー
    const [listOfPosts, setListOfPosts] = useState<any>([]);
    let { id } = useParams<{ id: string }>();
    let history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byhashtag/${id}`, {
            headers: {
                "accessToken": localStorage.getItem("accessToken") as string
            }
        })
            .then((response) => {
                setListOfPosts(response.data.tagPosts);
            });
    }, [id]);
    return (
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1>#{id}</h1>
                <h2>投稿：{listOfPosts.length}件</h2>
            </div>
            <div className="listOfPosts">
                {listOfPosts && (
                    listOfPosts.map((value: POST, key: number) => {
                        return (
                            <div key={key} className="post">
                                <div className="title">{value.title}</div>
                                <div className="body" onClick={() => { history.push(`/post/${value.id}`) }}>{value.postText}</div>
                                <div className="footer">
                                    <div className="postInfo">
                                        <div className="username">{value.username}</div>
                                        <div className="buttons">
                                            <label> {value.Likes.length}</label>
                                        </div>
                                    </div>
                                    <div className="tags">
                                        {value.Tags.map((tag: TAG, key: number) => {
                                            return (
                                                <div key={key}>#{tag.tag_name}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    }))}
            </div>
        </div>
    )
}

export default TagPosts