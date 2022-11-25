import axios from "axios";

export const postAddComment = async (id: string, comment: string) => {
    console.log("comment", comment);
    const response = await axios.post(
        "http://localhost:3001/comments",
        {
            PostId: id,
            commentBody: comment,
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken") as string,
            },
        }
    );
    return response;
};

export const deleteComment = async (commentId: string) => {
    const response = await axios.delete(
        `http://localhost:3001/comments/${commentId}`,
        {
            headers: {
                accessToken: localStorage.getItem("accessToken") as string,
            },
        }
    );
    return response;
};

export const deletePost = async (id: string) => {
    axios.delete(`http://localhost:3001/posts/${id}`, {
        headers: {
            accessToken: localStorage.getItem("accessToken") as string,
        },
    });
};

export const putEditPost = async (editType: string, id: string) => {
    if (editType === "title") {
        let newTitle = prompt("タイトルを入力してください");
        axios.put(
            "http://localhost:3001/posts/title",
            {
                newTitle: newTitle,
                id: id,
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken") as string,
                },
            }
        );
    } else {
        let newPostText = prompt("テキストを入力してください");
        axios.put(
            "http://localhost:3001/posts/postText",
            {
                newPostText: newPostText,
                id: id,
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken") as string,
                },
            }
        );
    }
};

export const getComments = async (id: string) => {
    const response = await axios.get(`http://localhost:3001/comments/${id}`);
    return response;
};

export const getPost = async (id: string) => {
    const response = await axios.get(`http://localhost:3001/posts/byId/${id}`);
    return response;
};
