import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import '../App.css';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    
    let history = useHistory();

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
                <div key={key} className="post" onClick={() => {history.push(`/post/${value.id}`)}}>
                  <div className="title">{value.title}</div>
                  <div className="body">{value.postText}</div>
                  <div className="footer">{value.username}</div>
                </div>
            )
        })}
    </div>
  )
}

export default Home