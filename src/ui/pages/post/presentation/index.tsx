import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Usecase from "../../../../core/usecase/post";
import { AuthContext } from "../../../../helpers/AuthContext";

export const useCreateProps = () => {
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState();
    let { id } = useParams<{ id: string }>();
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        Usecase.getCommentsInfo(id, setComments);
        Usecase.getPostInfo(id, setPost);
    }, []);

    return {
        id,
        authState,
        comments,
        post,
        setComments,
    };
};
