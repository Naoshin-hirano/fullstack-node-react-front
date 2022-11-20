import useSWR from "swr";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { TAG, AUTH_STATE } from "../../../../types";

interface POST_DETAIL_PROPS {
    id: string;
    authState: AUTH_STATE;
}

export const PostDetail = ({ id, authState }: POST_DETAIL_PROPS) => {
    const { data, error } = useSWR(`http://localhost:3001/posts/byId/${id}`, {
        refreshInterval: 1000,
    });
    let history = useHistory();

    const deletePost = () => {
        axios
            .delete(`http://localhost:3001/posts/${id}`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken") as string,
                },
            })
            .then(() => {
                history.push("/");
            });
    };

    const editPost = (editType: string) => {
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
                        accessToken: localStorage.getItem(
                            "accessToken"
                        ) as string,
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
                        accessToken: localStorage.getItem(
                            "accessToken"
                        ) as string,
                    },
                }
            );
        }
    };
    return (
        <div>
            {data ? (
                <div className="leftSide">
                    <div className="post" id="individual">
                        <div
                            className="title"
                            onClick={() => {
                                if (authState.username === data.username) {
                                    editPost("title");
                                }
                            }}
                        >
                            {data.title}
                        </div>
                        <div
                            className="body"
                            onClick={() => {
                                if (authState.username === data.username) {
                                    editPost("body");
                                }
                            }}
                        >
                            {data.postText}
                            <img
                                src={`http://localhost:3000/${data.imageName}`}
                                alt=""
                                style={{
                                    width: 336,
                                    height: 224,
                                    marginTop: 10,
                                }}
                            />
                        </div>
                        <div className="footer">
                            <div className="footerContent">
                                {data.username}
                                {authState.username === data.username && (
                                    <button onClick={deletePost}>
                                        Delete Post
                                    </button>
                                )}
                            </div>
                            <div className="tags">
                                {data.Tags.length > 0 &&
                                    data.Tags.map((tag: TAG, key: number) => {
                                        return (
                                            <div key={key}>#{tag.tag_name}</div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>{error}</h1>
            )}
        </div>
    );
};
