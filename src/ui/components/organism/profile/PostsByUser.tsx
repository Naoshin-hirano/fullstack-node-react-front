import { useHistory } from "react-router-dom";
import { POST, TAG } from "../../../../types";

export const PostsByUser = (props: { listOfPosts: POST[] }) => {
    let history = useHistory();
    return (
        <div className="listOfPosts">
            {props.listOfPosts.map((value: POST, key: number) => {
                return (
                    <div key={key} className="post">
                        <div className="title">{value.title}</div>
                        <div
                            className="body"
                            onClick={() => {
                                history.push(`/post/${value.id}`);
                            }}
                        >
                            <p>{value.postText}</p>
                            <img
                                src={value.imageName}
                                alt="imageName"
                                className="postImage"
                            />
                        </div>
                        <div className="footer">
                            <div className="postInfo">
                                <div className="username">{value.username}</div>
                                <div className="buttons">
                                    <label>{value.Likes.length} いいね</label>
                                </div>
                            </div>
                            <div className="tags">
                                {value.Tags.map((tag: TAG, key: number) => {
                                    return <div key={key}>#{tag.tag_name}</div>;
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
