import React, { FC } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import TagPosts from "./pages/TagPosts";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

const App: FC = () => {
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
    });

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({
            username: "",
            id: 0,
            status: false,
        });
    };

    useEffect(() => {
        // tokenを解析してログイン中なのか判断
        axios
            .get("https://fullstack-api-node.herokuapp.com/auth/auth", {
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
                                <Link to="/registration"> Registration</Link>
                                <Link to="/login"> Login</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/"> Home Page</Link>
                                <Link to="/createpost"> Create A Post</Link>
                            </>
                        )}
                        <div className="loggedInContainer">
                            <h1>{authState.username} </h1>
                            {authState.status && (
                                <Link to="/login">
                                    <button onClick={logout}> Logout</button>
                                </Link>
                            )}
                        </div>
                    </div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route
                            path="/createpost"
                            exact
                            component={CreatePost}
                        />
                        <Route path="/post/:id" exact component={Post} />
                        <Route
                            path="/post/hashtag/:id"
                            exact
                            component={TagPosts}
                        />
                        <Route
                            path="/registration"
                            exact
                            component={Registration}
                        />
                        <Route path="/login" exact component={Login} />
                        <Route path="/profile/:id" exact component={Profile} />
                        <Route
                            path="/changepassword"
                            exact
                            component={ChangePassword}
                        />
                        <Route path="*" exact component={PageNotFound} />
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    );
};

export default App;
