import { useHistory } from "react-router-dom";
import { TAG, POST } from "../../../../types";
import { mainProps } from "../../template/tag-posts";
import { Loading } from "../common/Loading";

export const TagPosts = ({ listOfPosts, id, loading }: mainProps) => {
    let history = useHistory();

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="profilePageContainer">
                    <div className="basicInfo">
                        <h1>#{id}</h1>
                        <h2>投稿：{listOfPosts?.length}件</h2>
                    </div>
                    <div className="listOfPosts">
                        {listOfPosts &&
                            listOfPosts.map((value: POST, key: number) => {
                                return (
                                    <div key={key} className="post">
                                        <div className="title">
                                            {value.title}
                                        </div>
                                        <div
                                            className="body"
                                            onClick={() => {
                                                history.push(
                                                    `/post/${value.id}`
                                                );
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
                                                <div className="username">
                                                    {value.username}
                                                </div>
                                                <div className="buttons">
                                                    <label>
                                                        {value.Likes.length}{" "}
                                                        いいね
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="tags">
                                                {value.Tags.map(
                                                    (tag: TAG, key: number) => {
                                                        return (
                                                            <div key={key}>
                                                                #{tag.tag_name}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}
        </>
    );
};
