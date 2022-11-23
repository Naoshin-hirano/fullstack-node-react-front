import { TAG, AUTH_STATE } from "../../../../types";

interface POST_DETAIL_PROPS {
    post: any;
    authState: AUTH_STATE;
    deletePost: any;
    editPost: any;
}

export const PostDetail = ({
    post,
    authState,
    deletePost,
    editPost,
}: POST_DETAIL_PROPS) => {
    return (
        <div>
            {post && (
                <div className="leftSide">
                    <div className="post" id="individual">
                        <div
                            className="title"
                            onClick={() => {
                                if (authState.username === post.username) {
                                    editPost("title");
                                }
                            }}
                        >
                            {post.title}
                        </div>
                        <div
                            className="body"
                            onClick={() => {
                                if (authState.username === post.username) {
                                    editPost("body");
                                }
                            }}
                        >
                            {post.postText}
                            <img
                                src={`http://localhost:3000/${post.imageName}`}
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
                                {post.username}
                                {authState.username === post.username && (
                                    <button onClick={deletePost}>
                                        Delete Post
                                    </button>
                                )}
                            </div>
                            <div className="tags">
                                {post.Tags.length > 0 &&
                                    post.Tags.map((tag: TAG, key: number) => {
                                        return (
                                            <div key={key}>#{tag.tag_name}</div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};