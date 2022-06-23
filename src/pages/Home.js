import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import '../App.css';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    
    let history = useHistory();

    const likeAPost = (postId) => {
        // bodyはオブジェクトなのでPostIdもオブジェクトにする
        axios.post("http://localhost:3001/likes",
            { PostId: postId },
            { headers: { "accessToken": localStorage.getItem("accessToken")}}
        ).then((response) => {
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
        });
    };

    useEffect(() => {
        axios.get("http://localhost:3001/posts")
        .then(response => {
            setListOfPosts(response.data);
        });
    }, []);
    return (
    <div>
        {listOfPosts.map((value, key) => {
            return (
                <div key={key} className="post">
                  <div className="title">{value.title}</div>
                  <div className="body" onClick={() => {history.push(`/post/${value.id}`)}}>{value.postText}</div>
                  <div className="footer">{value.username}
                    <button onClick={()=> {likeAPost(value.id)}}> Like</button>
                    <label>{value.Likes.length}</label>
                  </div>
                </div>
            )
        })}
    </div>
  )
}

export default Home