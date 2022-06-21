import { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from './pages/Home';
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
      // tokenを解析してログイン中なのか判断
      axios.get("http://localhost:3001/auth/auth", {
        headers: {
            "accessToken": localStorage.getItem("accessToken")
        }
      })
      .then((response) => {
          if (response.data.error) {
            setAuthState(false);
          } else {
            setAuthState(true);
          }
      });
  },[]);
  return (
    <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <Router>
                <div className="navbar">
                    <Link to="/"> Home Page</Link>
                    <Link to="/createpost"> Create A Post</Link>
                    {!authState && (
                        <>
                            <Link to="/registration"> Registration</Link>
                            <Link to="/login"> Login</Link>
                        </>
                    )}
                </div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/createpost" exact component={CreatePost} />
                    <Route path="/post/:id" exact component={Post} />
                    <Route path="/registration" exact component={Registration} />
                    <Route path="/login" exact component={Login} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    </div>
  );
}

export default App;
