import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Usecase from "../../../../core/usecase/tag-posts";
import { POST } from "../../../../types";

export const useCreateProps = () => {
    const [listOfPosts, setListOfPosts] = useState<POST[]>([]);
    const [loading, setLoading] = useState(false);
    let { id } = useParams<{ id: string }>();

    useEffect(() => {
        setLoading(true);
        Usecase.getTagPost(id, setListOfPosts);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [id]);

    return {
        listOfPosts,
        id,
        loading,
    };
};
