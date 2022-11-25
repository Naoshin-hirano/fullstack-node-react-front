import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { AUTH_STATE } from "../../../types";

interface GLOBAL_HEADER {
    authState: AUTH_STATE;
    logout: () => void;
}

export const GlobalHeader = ({ authState, logout }: GLOBAL_HEADER) => {
    return (
        <div className="navbar">
            {!authState.status ? (
                <>
                    <Link to="/registration"> 新規登録</Link>
                    <Link to="/login"> ログイン</Link>
                </>
            ) : (
                <>
                    <Link to="/">
                        <HomeIcon />
                    </Link>
                    <Link to="/createpost">
                        <PostAddIcon />
                    </Link>
                </>
            )}
            <div className="loggedInContainer">
                {authState.status && (
                    <>
                        {authState.imageName ? (
                            <Link to={`/profile/${authState.id}`}>
                                <img
                                    src={`http://localhost:3000/${authState.imageName}`}
                                    alt="Avatar"
                                    className="avatar"
                                />
                            </Link>
                        ) : (
                            <img
                                src={
                                    "https://png.pngtree.com/png-vector/20191110/ourlarge/pngtree-avatar-vector-icon-white-transparent-background-png-image_1978010.jpg"
                                }
                                alt="Avatar"
                                className="avatar"
                            />
                        )}
                        <Link to="/login">
                            <button onClick={logout}>ログアウト</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};
