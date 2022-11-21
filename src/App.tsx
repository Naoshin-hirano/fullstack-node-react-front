import React, { FC } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./ui/components/organism/home";
import Post from "./ui/components/organism/post";
import Registration from "./ui/components/organism/registration";
import PageNotFound from "./ui/pages/PageNotFound";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Profile from "./ui/components/organism/profile";
import HomeIcon from "@material-ui/icons/Home";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { DirectMessage } from "./ui/components/organism/direct-message";
import { TagPostsPage } from "./ui/pages/tag-posts";
import { LoginPage } from "./ui/pages/login";
import { ChangeProfilePage } from "./ui/pages/change-profile";
import { CreatePostPage } from "./ui/pages/create-post";

const App: FC = () => {
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
        imageName: "",
    });

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({
            username: "",
            id: 0,
            status: false,
            imageName: "",
        });
    };

    useEffect(() => {
        // tokenを解析してログイン中なのか判断
        axios
            .get("http://localhost:3001/auth/auth", {
                headers: {
                    accessToken: localStorage.getItem("accessToken") as string,
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({
                        ...authState,
                        status: false,
                    });
                } else {
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        status: true,
                        imageName: response.data.imageName,
                    });
                }
            });
    }, []);
    return (
        <div className="App">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
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
                                        <img
                                            src={`http://localhost:3000/${authState.imageName}`}
                                            alt="Avatar"
                                            className="avatar"
                                        />
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
                                        <button onClick={logout}>
                                            ログアウト
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route
                            path="/createpost"
                            exact
                            component={CreatePostPage}
                        />
                        <Route path="/post/:id" exact component={Post} />
                        <Route
                            path="/post/hashtag/:id"
                            exact
                            component={TagPostsPage}
                        />
                        <Route
                            path="/registration"
                            exact
                            component={Registration}
                        />
                        <Route path="/login" exact component={LoginPage} />
                        <Route path="/profile/:id" exact component={Profile} />
                        <Route
                            path="/changeprofile"
                            exact
                            component={ChangeProfilePage}
                        />
                        <Route
                            path="/directmessage/:id"
                            exact
                            component={DirectMessage}
                        />
                        <Route path="*" exact component={PageNotFound} />
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    );
};

export default App;
