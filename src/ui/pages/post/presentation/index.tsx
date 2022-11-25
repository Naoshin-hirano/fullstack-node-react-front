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
    const [post, setPost] = useState<POST | undefined>();
    let { id } = useParams<{ id: string }>();
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        Usecase.getCommentsInfo(id, setComments);
        Usecase.getPostInfo(id, setPost);
    }, [id]);

    return {
        id,
        authState,
        comments,
        post,
        setComments,
    };
};
