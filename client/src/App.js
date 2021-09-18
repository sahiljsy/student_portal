import React, { useState } from "react";
import Header from "./components/header/header";
import Userdetails from "./components/userdetails/userdetails";
import Addassignment from "./components/addassignment/addassignment";
import Accessdenied from "./components/accessdenied/accessdenied";
import Pagenotfound from "./components/pagenotfound/pagenotfound";
import Noticeform from "./components/noticeform/noticeform";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Home from "./components/Home/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Result } from "./components/result/result";
import Mysubject from "./components/mysubject/mysubject";
import Subject from "./components/subject/subject";
import Assignment from "./components/Assignment/assignment";
import Classform from "./components/classform/classform";
import Addresult from "./components/addresult/addresult";
import Joinclass from "./components/joinclass/joinclass";

const App = () => {
  const [user, setLoginUser] = useState({});
  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route path="/userdetails">
            <Userdetails />
          </Route>
          <Route path="/mysubject/addassignment">
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
          <Route exact path="/">
            <Home setLoginUser={setLoginUser} user={user} />
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/result">
            <Result />
          </Route> 
          <Route exact path="/mysubject">
            <Mysubject />
          </Route> 
          <Route path="/mysubject/classform">
            <Classform/>
          </Route>
          <Route path="/mysubject/subject">
            <Subject />
          </Route>
          <Route path="/mysubject/assignment">
            <Assignment />
          </Route> 
          <Route path="/addresult">
            <Addresult />
          </Route>
          <Route path="/mysubject/joinclass">
            <Joinclass/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
