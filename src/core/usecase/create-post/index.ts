import { Dispatch, SetStateAction } from "react";
import { TAG } from "../../../types";
import { SUBMIT_DATA } from "../../../ui/components/organism/create-post";
import { getTags, postCreatePost } from "../../domain/api/create-post/service";

// パスワードの変更
export const postCreatePostInfo = async (data: SUBMIT_DATA) => {
    const result = await postCreatePost(data);
    if (result.data.error) {
        console.log(result.data.error);
    } else {
        console.log("IT WORKED");
        return result;
    }
};

// タグデータの取得
export const getTagsInfo = async (setTags: Dispatch<SetStateAction<TAG[]>>) => {
    const result = await getTags();
    setTags(result.data);
};
