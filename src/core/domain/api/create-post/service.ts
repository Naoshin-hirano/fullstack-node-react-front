import axios from "axios";
import { apiConfig } from "../../../../config";
import { SUBMIT_DATA } from "../../../../ui/components/organism/create-post";
import { headers } from "../common/global-header/service";

// パスワードの変更
export const postCreatePost = async (data: SUBMIT_DATA) => {
    const url = apiConfig.posts.url;
    // formikのvaluesをアップロード画像が送信できるようにnew FormData()のデータにする
    // Tagsの配列をパタメータにすると中身が展開され送信されるので、配列をstringifyで文字列化して送信→Node側で文字列化解除する
    const formData = new FormData();
    // const object1 = {
    //     a: "somestring",
    //     b: 42,
    //     c: false,
    // };
    // console.log(Object.keys(object1));
    // expected output: Array ["a", "b", "c"]
    // Object.keysの配列がSUBMIT_DATAのキーであることを証明できればOK
    // data[key] はオブジェクトのキーに対する値。そいつが配列かどうかをチェックしてる
    (Object.keys(data) as (keyof SUBMIT_DATA)[]).forEach((key) => {
        if (Array.isArray(data[key])) {
            formData.append(key, JSON.stringify(data[key]));
        } else {
            formData.append(key, data[key] as any);
        }
    });
    const response = await axios.post(url, formData, headers());
    return response;
};

// タグの取得
export const getTags = async () => {
    const url = apiConfig.tags.url;
    const response = await axios.get(url);
    return response;
};
