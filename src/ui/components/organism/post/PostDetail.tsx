import { Dispatch, SetStateAction } from "react";
import { TAG, AUTH_STATE, POST } from "../../../../types";

interface POST_DETAIL_PROPS {
    post: POST | undefined;
    authState: AUTH_STATE;
    setEditOpenModal: Dispatch<SetStateAction<boolean>>;
    setDeleteOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const PostDetail = ({
    post,
    authState,
    setEditOpenModal,
    setDeleteOpenModal,
}: POST_DETAIL_PROPS) => {
    return (
        <div>
            {post && (
                <div className="leftSide">
                    <div className="post" id="individual">
                        <div className="title">{post.title}</div>
                        <div className="body">
                            {post.postText}
                            <img
                                src={post.imageName}
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
                                    <>
                                        <button
                                            onClick={() =>
                                                setDeleteOpenModal(true)
                                            }
                                        >
                                            削除
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditOpenModal(true);
                                            }}
                                        >
                                            編集
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className="tags">
                                {post &&
                                    post.Tags.length > 0 &&
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
