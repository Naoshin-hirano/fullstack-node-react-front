import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Usecase from "../../../../core/usecase/post";
import { AuthContext } from "../../../../helpers/AuthContext";
import { COMMENT, POST } from "../../../../types";

export const useCreateProps = () => {
    const [comments, setComments] = useState<COMMENT[]>([
        {
            id: "",
            commentBody: "",
            username: "",
        },
    ]);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState<POST | undefined>();
    let { id } = useParams<{ id: string }>();
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        Usecase.getCommentsInfo(id, setComments);
        Usecase.getPostInfo(id, setPost);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [id]);

    return {
        id,
        authState,
        comments,
        post,
        setPost,
        setComments,
        loading,
    };
};
