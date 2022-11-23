import { tagPostGet } from "../../domain/api/tag-posts/service";

export const getTagPost = async (id: string, setListOfPosts: any) => {
    const result = await tagPostGet(id);
    setListOfPosts(result.data.tagPosts);
};
