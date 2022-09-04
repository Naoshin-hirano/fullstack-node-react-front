import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { PostComments } from "../Components/PostComments";
import { PostDetail } from "../Components/PostDetail";

function Post() {
    let { id } = useParams<{ id: string }>();
    const { authState } = useContext(AuthContext);

    return (
        <div className="postPage">
            <PostDetail id={id} authState={authState} />
            <PostComments id={id} authState={authState} />
        </div>
    );
}

export default Post;
