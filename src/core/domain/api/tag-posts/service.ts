import axios from "axios";

export const tagPostGet = (id: string) => {
    const response = axios.get(`http://localhost:3001/posts/byhashtag/${id}`, {
        headers: {
            accessToken: localStorage.getItem("accessToken") as string,
        },
    });
    return response;
};
