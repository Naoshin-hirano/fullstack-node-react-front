import { Dispatch, SetStateAction } from "react";
import { POST } from "../../../types";
import { tagPostGet } from "../../domain/api/tag-posts/service";

export const getTagPost = async (
    id: string,
    setListOfPosts: Dispatch<SetStateAction<POST[]>>
) => {
    const result = await tagPostGet(id);
    setListOfPosts(result.data.tagPosts);
};
