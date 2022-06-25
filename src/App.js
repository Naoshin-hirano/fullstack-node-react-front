import { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from './pages/Home';
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import Profile from "./pages/Profile";

function App() {
  const [authState, setAuthState] = useState({
      username: "",
      id: 0,
      status: false
    });

  const logout = () => {
      localStorage.removeItem("accessToken");
      setAuthState({
        username: "",
        id: "",
        status: false
      });
  };

  useEffect(() => {
      // tokenを解析してログイン中なのか判断
      axios.get("http://localhost:3001/auth/auth", {
        headers: {
            "accessToken": localStorage.getItem("accessToken")
        }
      })
      .then((response) => {
          if (response.data.error) {
            setAuthState({
                ...authState,
                status: false
              });
          } else {
            setAuthState({
                username: response.data.username,
                id: response.data.id,
                status: true
            });
          }
      });
  },[]);
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
                        {authState.status && <button onClick={logout}> Logout</button>}
                    </div>
                </div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/createpost" exact component={CreatePost} />
                    <Route path="/post/:id" exact component={Post} />
                    <Route path="/registration" exact component={Registration} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/profile/:id" exact component={Profile} />
                    <Route path="*" exact component={PageNotFound} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    </div>
  );
}

export default App;
