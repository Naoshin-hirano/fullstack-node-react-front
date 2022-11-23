import axios from "axios";

// パスワードの変更
export const postCreatePost = async (data: any) => {
    // formikのvaluesをアップロード画像が送信できるようにnew FormData()のデータにする
    // Tagsの配列をパタメータにすると中身が展開され送信されるので、配列をstringifyで文字列化して送信→Node側で文字列化解除する
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
            formData.append(key, JSON.stringify(data[key]));
        } else {
            formData.append(key, data[key]);
        }
    });
    const response = await axios.post("http://localhost:3001/posts", formData, {
        headers: {
            accessToken: localStorage.getItem("accessToken") as string,
        },
    });
    return response;
};

// タグの取得
export const getTags = async () => {
    const response = await axios.get("http://localhost:3001/tags");
    return response;
};
