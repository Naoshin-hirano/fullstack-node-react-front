import { useHistory, Link } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { POST, TAG } from "../types";

export const CurrentPosts = ({ currentPosts, likeAPost, likedPosts }: any) => {
    let history = useHistory();
    return (
        <div>
            {currentPosts &&
                currentPosts.map((value: POST, key: number) => {
                    return (
                        <div key={key} className="post">
                            <div className="title">{value.title}</div>
                            <div
                                className="body"
                                onClick={() => {
                                    history.push(`/post/${value.id}`);
                                }}
                            >
                                {value.postText}
                                <img
                                    src={`http://localhost:3000/${value.imageName}`}
                                    alt="imageName"
                                    style={{ width: 211, height: 141 }}
                                />
                            </div>
                            <div className="footer">
                                <div className="postInfo">
                                    <div className="username">
                                        <Link to={`/profile/${value.UserId}`}>
                                            {value.username}
                                        </Link>
                                    </div>
                                    <div className="buttons">
                                        <ThumbUpAltIcon
                                            onClick={() => {
                                                likeAPost(value.id);
                                            }}
                                            className={
                                                likedPosts.includes(value.id)
                                                    ? "unlikeBttn"
                                                    : "likeBttn"
                                            }
                                        />
                                        <label> {value.Likes.length}</label>
                                    </div>
                                </div>
                                <div className="tags">
                                    {value.Tags.map((tag: TAG, key: number) => {
                                        return (
                                            <Link
                                                key={key}
                                                to={`/post/hashtag/${tag.tag_name}`}
                                            >
                                                <div>#{tag.tag_name}</div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};
