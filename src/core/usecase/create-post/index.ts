import { getTags, postCreatePost } from "../../domain/api/create-post/service";

// パスワードの変更
export const postCreatePostInfo = async (data: string) => {
    const result = await postCreatePost(data);
    if (result.data.error) {
        console.log(result.data.error);
    } else {
        console.log("IT WORKED");
        return result;
    }
};

// タグデータの取得
export const getTagsInfo = async (setTags: any) => {
    const result = await getTags();
    setTags(result.data);
};
