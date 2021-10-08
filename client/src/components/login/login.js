import React, { Component } from "react";
import styles from "./login.module.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginHeader from '../header/loginHeader'
toast.configure();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      setUser: this.props.setuser
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

  login = (e) => {
    const { history } = this.props;
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      axios({
        method: "POST",
        data: this.state,
        withCredentials: true,
        url: "user/signin",
      }).then((res) => {
        if (res.data.error) {
          toast.error(res.data.error, {
            position: "top-center",
            theme: "colored",
          });
        } else {
          this.props.setLogin(true);
          this.state.setUser(res.data.user);
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("role", res.data.user.role);
          toast.success(res.data.success, {
            position: "top-center",
            theme: "colored",
          });
            history.push("/");
        }
      });
    } else {
      toast.error("invalid input", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  render() {
    if (localStorage.getItem("accessToken")) {
      return <Redirect to={"/"} />;
    }
    const { history } = this.props;
    return (
      <>
      <LoginHeader />
      <div className={styles.form_container}>
        <form>
          <label htmlFor="email" className={styles.label}>
            Email<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.margin_50}
            placeholder="abc@gmail.com"
            value={this.state.email}
            onChange={this.handleChange}
            style={{ width: "80%" }}
          />
          <span className="error"></span>
          <label htmlFor="password" className={styles.label}>
            Password<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={this.handleChange}
            value={this.state.password}
            style={{ width: "80%" }}
          />
          <span className="error"></span>
          <br />
          <br />
          <button type="submit" className={styles.button} onClick={this.login}>
            Log In
          </button>
          <br />
          <br />
          OR
          <br />
          <button
            type="submit"
            className={styles.button}
            onClick={() => history.push("/register")}
          >
            Register
          </button>
        </form>
      </div>
      </>
    );
  }
}

export default withRouter(Login);
