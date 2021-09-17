import React, { useState } from "react";
import Header from "./components/header/header";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Home from "./components/Home/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Result } from "./components/result/result";
import Mysubject from "./components/mysubject/mysubject";
import Subject from "./components/subject/subject";
import Assignment from "./components/Assignment/assignment"

const App = () => {
  const [user, setLoginUser] = useState({});
  return (
    <div>
      <Header />
      <Router>
        <Switch>
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
          <Route path="/mysubject/subject">
            <Subject />
          </Route>
          <Route path="/mysubject/assignment">
            <Assignment />
          </Route> 
        </Switch>
      </Router>
    </div>
  );
};

export default App;
