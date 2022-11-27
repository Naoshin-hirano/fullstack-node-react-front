import { FC } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from "./ui/pages/PageNotFound";
import { AuthContext } from "./helpers/AuthContext";
import { TagPostsPage } from "./ui/pages/tag-posts";
import { LoginPage } from "./ui/pages/login";
import { ChangeProfilePage } from "./ui/pages/change-profile";
import { CreatePostPage } from "./ui/pages/create-post";
import { ProfilePage } from "./ui/pages/profile";
import { RegistrationPage } from "./ui/pages/registration";
import { PostPage } from "./ui/pages/post";
import { HomePage } from "./ui/pages/home";
import { DirectMessagePage } from "./ui/pages/direct-message";
import { GlobalHeader } from "./ui/pages/common/GlobalHeader";
import * as Usecase from "./core/usecase/common/global-header";

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
        Usecase.getConfirmLoggedInInfo(authState, setAuthState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="App">
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    <GlobalHeader authState={authState} logout={logout} />
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route
                            path="/createpost"
                            exact
                            component={CreatePostPage}
                        />
                        <Route path="/post/:id" exact component={PostPage} />
                        <Route
                            path="/post/hashtag/:id"
                            exact
                            component={TagPostsPage}
                        />
                        <Route
                            path="/registration"
                            exact
                            component={RegistrationPage}
                        />
                        <Route path="/login" exact component={LoginPage} />
                        <Route
                            path="/profile/:id"
                            exact
                            component={ProfilePage}
                        />
                        <Route
                            path="/changeprofile"
                            exact
                            component={ChangeProfilePage}
                        />
                        <Route
                            path="/directmessage/:id"
                            exact
                            component={DirectMessagePage}
                        />
                        <Route path="*" exact component={PageNotFound} />
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    );
};

export default App;
