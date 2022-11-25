import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Usecase from "../../../../core/usecase/tag-posts";
import { POST } from "../../../../types";

export const useCreateProps = () => {
    const [listOfPosts, setListOfPosts] = useState<POST[]>([]);
    let { id } = useParams<{ id: string }>();

    useEffect(() => {
        Usecase.getTagPost(id, setListOfPosts);
    }, [id]);

    return {
        listOfPosts,
        id,
    };
};
