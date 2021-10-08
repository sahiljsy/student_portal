import React, { useState, useEffect } from "react";
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
import AdminHome from "./components/Home/adminHome";
import AdminReg from "./components/register/adminReg";
import Joinclass from "./components/joinclass/joinclass";
import Edituserdetails from "./components/edituserdetails/edituserdetails";
import ViewPeople from "./components/viewpeople/viewpeople";
// import Editclass from "./components/editclass/editclass";
import axios from "axios";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";

const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    let isAuthnticated = localStorage.getItem("accessToken");
    if (isAuthnticated) {
      axios
        .get("/user/info", {
          headers: {
            accessToken: isAuthnticated,
          },
        })
        .then((res) => {
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            setUser(res.data.user);
          }
        });
    }
  },[]);

  return (
    <div>
      <Header user={{user}} />
      <Router>
        <Switch>
        <Route path="/admin/register">
            <AdminReg />
          </Route>
          <Route path="/accessdenied">
            <Accessdenied />
          </Route>
          <Route path="/pagenotfound">
            <Pagenotfound />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <ProtectedRoute exact path="/" component={() => <Home user ={user}/>} />
          <ProtectedRoute exact path="/admin" component={() => <AdminHome />} />
          <ProtectedRoute
            path="/admin/subject"
            component={() => <Mysubject />}
          />
          <ProtectedRoute
            path="/userdetails"
            component={() => <Userdetails user={user}/>}
          />
          <ProtectedRoute
            path="/edituserdetails"
            component={() => <Edituserdetails user={user} setUser={setUser}/>}
          />
          <ProtectedRoute
            path="/mysubject/addassignment"
            component={() => <Addassignment user={user} />}
          />
          <ProtectedRoute path="/noticeform" component={() => <Noticeform user={user}/>} />
          <ProtectedRoute path="/result" component={() => <Result />} />
          <ProtectedRoute
            exact
            path="/mysubject"
            component={() => <Mysubject />}
          />
          <ProtectedRoute
            path="/mysubject/classform"
            component={() => <Classform  user={user}/>}
          />
          {/* <ProtectedRoute
            path="/mysubject/editclass"
            component={() => <Editclass  user={user}/>}
          /> */}
          <ProtectedRoute
            path="/mysubject/subject"
            component={() => <Subject />}
          />
          <ProtectedRoute
            path="/mysubject/assignment"
            component={() => <Assignment />}
          />
          <ProtectedRoute path="/addresult" component={() => <Addresult />} />
          <ProtectedRoute
            path="/mysubject/joinclass"
            component={() => <Joinclass user={user}/>}
          />
          <ProtectedRoute
            path="/mysubject/viewpeople"
            component={() => <ViewPeople user={user}/>}
          />
          <Route path="*"><Pagenotfound /></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
