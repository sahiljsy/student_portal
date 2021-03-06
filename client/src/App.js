import React, { useState, useEffect } from "react";
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
import AdminReg from "./components/register/adminReg";
import Joinclass from "./components/joinclass/joinclass";
import Edituserdetails from "./components/edituserdetails/edituserdetails";
// import UpdateAssignment from "./components/updateassignment/updateassignment";
// import Editclass from "./components/editclass/editclass";
import axios from "axios";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import Updatenoticeform from "./components/updatenoticeform/updatenoticeform";
import People from "./components/student/people";
import Viewsubmissions from "./components/viewsubmissions/viewsubmissions";
import Contactus from "./components/contactus/contactus";
// import Editclass from "./components/editclass/editclass";


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
  }, []);

  return (
    <div>

      <Router>
        <Switch>
          <Route path="/accessdenied">
            <Accessdenied />
          </Route>
          <Route exact path="/login">
            <Login setuser={setUser} />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            component={() => <Home user={user} />}
          />
          <ProtectedRoute
            exact
            path="/admin/register"
            component={() => <AdminReg user={user} />}
          />
          <ProtectedRoute
            exact
            path="/contactus"
            component={() => <Contactus user={user} />}
          />
          <ProtectedRoute
            exact
            path="/admin/subject"
            component={() => <Mysubject user={user} />}
          />
          <ProtectedRoute
            exact
            path="/mysubject/viewsubmissions/:id"
            component={() => <Viewsubmissions user={user} />}
          />
          <ProtectedRoute
            exact
            path="/userdetails"
            component={() => <Userdetails user={user} />}
          />
          <ProtectedRoute
            exact
            path="/mysubject/addassignment"
            component={() => <Addassignment user={user} />}
          />

          <ProtectedRoute
          exact
            path="/edituserdetails"
            component={() => <Edituserdetails user={user} setuser={setUser} />}

          />
          <ProtectedRoute
            exact
            path="/noticeform"
            component={() => <Noticeform user={user} />}
          />
          <ProtectedRoute
            exact
            path="/result"
            component={() => <Result user={user} />}
          />
          <ProtectedRoute
            exact
            path="/mysubject"
            component={() => <Mysubject user={user} />}
          />
          <ProtectedRoute
            exact
            path="/mysubject/classform"
            component={() => <Classform user={user} />}
          />
          <ProtectedRoute
            path="/mysubject/subject/:id"
            component={() => <Subject user={user} />}
          />
          <ProtectedRoute
            exact
            path="/mysubject/assignment/:id/:type"
            component={() => <Assignment user={user} />}
          />
          <ProtectedRoute
            exact
            path="/addresult"
            component={() => <Addresult user={user} />}
          />
          <ProtectedRoute
            exact
            path="/mysubject/joinclass"
            component={() => <Joinclass user={user} />}
          />
          <ProtectedRoute
            path="/updatenotice"
            component={() => <Updatenoticeform user={user} />}
          />
          <ProtectedRoute
            exact
            path="/mysubject/people/:id"
            component={() => <People user={user} />}
          />
          
          
          <Route path="*">
            <Pagenotfound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
