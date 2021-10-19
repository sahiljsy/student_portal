import React, { Component } from "react";
import { Sidebar } from "../sidebar/sidebar";
import styles from "./adminreg.module.css";
import axios from "axios";
import Header from "../header/header";
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import AccessDenied from "../accessdenied/accessdenied"

class AdminReg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      password: "",
      repassword: "",
      email: "",
      contact_no: "",
      role: ""
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.name);
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  componentDidMount() {
    document.body.style.backgroundImage = "url('')";

  }

  register = () => {
    const { history } = this.props;
    const { name, username, password, repassword, email, contact_no, role } = this.state;
    // console.log(this.state);
    if (name && username && password && email && contact_no && password && repassword) {
      if (password === repassword) {
        if (role === "user" || role === "admin" || role === "faculty") {
          axios.post("http://localhost:5000/user/create", this.state)
            .then(res => {
              if (res.data.error) {
                toast.error(res.data.error, {
                  position: "top-center",
                  theme: "colored",
                });
              } else {
                toast.success("new user has registered", {
                  position: "top-center",
                  theme: "colored",
                });
                history.push("/");
              }

            });
        } else {
          toast.error("Role must be either 'user' or 'admin' or 'faculty'", {
            position: "top-center",
            theme: "colored",
          });
        }


      } else {
        toast.error("Password and Confirm Password didn't match.", {
          position: "top-center",
          theme: "colored",
        });
      }
    } else {
      toast.error("All fields are required.", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  render() {
    if (this.props.user.role === "student" || this.props.user.role === "faculty") {
      // console.log("in");
      return <AccessDenied />
    }
    return (
      <>
        <Header user={this.props.user} />
        <div className={styles.main_content}>
          <Sidebar user={this.props.user} />
          <div className={styles.border_box}>
          <p style={{fontSize: "40px",marginTop:"15px",fontWeight: "bolder",textAlign:"center"}}><u>ADD NEW USER</u></p>
            <div className={styles.row}>
              <div className={styles.col1}>
                <label>Name :</label>
              </div>
              <div className={styles.col2}>
                <input type="text" id="name" placeholder="name" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>
                <label>Email :</label>
              </div>
              <div className={styles.col2}>
                <input type="email" id="email" name="email" placeholder="abc@gmail.com" value={this.state.email} onChange={this.handleChange} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>
                <label>User Name :</label>
              </div>
              <div className={styles.col2}>
                <input type="text" name="username" placeholder=" User Name" id="first-name" value={this.state.username} onChange={this.handleChange} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>
                <label>Password: </label>
              </div>
              <div className={styles.col2}>
                <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>
                <label>Re-enter Password: </label>
              </div>
              <div className={styles.col2}>
                <input type="password" name="repassword" id="repassword" value={this.state.repassword} onChange={this.handleChange} />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>
                <label>Contact No :</label>
              </div>
              <div className={styles.col2}>
                <input
                  type="number"
                  id="m-no"
                  placeholder="1234567890"
                  name="contact_no"
                  value={this.state.contact_no}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>
                <label>Role :</label>
              </div>
              <div className={styles.col2}>
                <input type="text" name="role" id="role" placeholder="Role Of User" value={this.state.role} onChange={this.handleChange} />
              </div>
            </div>
            <div className={styles.row}>
              <input type="submit" value="Submit" style={{ float: "left" }} onClick={this.register} />
              <a href="/"><input type="button" value="Cancel" /></a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(AdminReg)
