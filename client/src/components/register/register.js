import React, { Component } from "react";
import styles from "./register.module.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginHeader from "../header/loginHeader";

toast.configure();

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      password: "",
      repassword: "",
      email: "",
      contact_no: "",
      allSet: true
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });

  };

  componentDidMount() {
    document.body.style.backgroundImage = "url('/stu.jpg')";
    document.body.style.backgroundSize = "cover";
  }

  register = () => {
    const { history } = this.props;
    const { name, username, password, email, contact_no } =
      this.state;
    if (
      name &&
      username &&
      password &&
      email &&
      contact_no && this.state.allSet
    ) {
      axios({
        method: "POST",
        data: this.state,
        withCredentials: true,
        url: "user/create",
      }).then((res) => {
        if (res.data.error) {
          toast.error(res.data.error, {
            position: "top-center",
            theme: "colored",
          });
        } else {
          toast.success(res.data.success, {
            position: "top-center",
            theme: "colored",
          });
          history.push("/login");
        }
      });
    } else {
      toast.error("Invalid input", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  handleBlur = (e) => {
    if (e.target.name === "name" && e.target.value === "") {
      document.getElementById("nameerror").innerHTML = "*inavlid name";
      this.setState({ allSet: false });
    } else {
      document.getElementById("nameerror").innerHTML = "*";
      this.setState({ allSet: true });
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (e.target.name === "email" && !e.target.value.match(mailformat)) {
      document.getElementById("emailerror").innerHTML = "*inavlid email";
      this.setState({ allSet: false });
    }
    else {
      document.getElementById("emailerror").innerHTML = "*";
      this.setState({ allSet: true });
    }
    if (e.target.name === "repassword" && (e.target.value !== this.state.password || e.target.value === "")) {
      document.getElementById("reenterpassworderror").innerHTML = "*Password didn't match";
      this.setState({ allSet: false });
    } else {
      document.getElementById("reenterpassworderror").innerHTML = "*";
      this.setState({ allSet: true });
    }
    if (e.target.name === "contact_no" && e.target.value.length !== 10) {
      document.getElementById("contacterror").innerHTML = "*Invalid contact number"
      this.setState({ allSet: false });
    } else {
      document.getElementById("contacterror").innerHTML = "*";
      this.setState({ allSet: true });
    }
  }

  render() {
    const { history } = this.props;
    if (localStorage.getItem("accessToken")) {
      return <Redirect to={"/"} />;
    }
    return (
      <>
        <LoginHeader />
        <div className={styles.form_container}>
          <h2>STUDENT INFORMATION</h2>
          <div className={styles.form_element}>
            <label htmlFor={styles.middle_name}>
              Name<span style={{ color: "red" }} id="nameerror">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </div>
          <div className={styles.form_element}>
            <label htmlFor="username">
              User Name<span style={{ color: "red" }} id="usererror">*</span>
            </label>
            <input
              type="text"
              id="first-name"
              placeholder="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              onBlur={this.handleBlur}

            />
          </div>
          <div className={styles.form_element}>
            <label htmlFor="password">
              Password<span style={{ color: "red" }} id="passworderror">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className={styles.form_element}>
            <label htmlFor="repassword">
              Reenter Password<span style={{ color: "red" }} id="reenterpassworderror">*</span>
            </label>
            <input
              type="password"
              id="repassword"
              name="repassword"
              value={this.state.repassword}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </div>
          <div className={styles.form_element}>
            <label htmlFor="email">
              Email<span style={{ color: "red" }} id="emailerror">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="abc@gmail.com"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              onBlur={this.handleBlur}

            />
          </div>
          <div className={styles.form_element}>
            <label htmlFor="m-no">
              Contact Number<span style={{ color: "red" }} id="contacterror">*</span>
            </label>
            <input
              type="number"
              id="m-no"
              placeholder="1234567890"
              name="contact_no"
              value={this.state.contact_no}
              onChange={this.handleChange}
              onBlur={this.handleBlur}

            />
          </div>
          <div className={styles.form_element}>
            <button
              type="submit"
              className={styles.btn}
              onClick={this.register}
            >
              REGISTER
            </button>
          </div>
          <div className={styles.form_element}>
            <button
              type="submit"
              className={styles.btn}
              value="LOGIN"
              onClick={() => history.push("/login")}
            >
              LOGIN
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Register);
