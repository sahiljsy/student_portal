import React, { useState } from "react";
import Header from "./components/header/header";
// import Login from "./components/login/login";
// import Register from "./components/register/register";
import Main from "./components/main/main";
import Userdetails from "./components/userdetails/userdetails";
import Addassignment from "./components/addassignment/addassignment";
import Accessdenied from "./components/accessdenied/accessdenied";
import Pagenotfound from "./components/pagenotfound/pagenotfound";
import Noticeform from "./components/noticeform/noticeform";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const [user, setLoginUser] = useState({});
  return (
    <div>
      <Header />
      <Router>
        <Switch>
          {/* <Route exact path="/">
            <Main setLoginUser={setLoginUser} />
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route> */}
          <Route path="/userdetails">
            <Userdetails />
          </Route>
          <Route path="/addassignment">
            <Addassignment/>
          </Route>
          <Route path="/noticeform">
            <Noticeform/>
          </Route>
          <Route path="/accessdenied">
            <Accessdenied/>
          </Route>
          <Route path="/pagenotfound">
            <Pagenotfound/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
