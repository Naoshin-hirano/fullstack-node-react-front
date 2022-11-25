import { useHistory, Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { POST, TAG } from "../../../../types";

interface CURRENT_POSTS_PROPS {
    currentPosts: POST[];
    likeAPost: (postId: number) => void;
    likedPosts: number[];
}

export const CurrentPosts = ({
    currentPosts,
    likeAPost,
    likedPosts,
}: CURRENT_POSTS_PROPS) => {
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
                                <p>{value.postText}</p>
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
                                        {likedPosts.includes(value.id) ? (
                                            <FavoriteIcon
                                                className="favoriteIcon"
                                                onClick={() => {
                                                    likeAPost(value.id);
                                                }}
                                            />
                                        ) : (
                                            <FavoriteBorderIcon
                                                className="favoriteBorder"
                                                onClick={() => {
                                                    likeAPost(value.id);
                                                }}
                                            />
                                        )}
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
                                                <div className="postTags">
                                                    #{tag.tag_name}
                                                </div>
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
