import React, { Component } from "react";
import styles from "./login.module.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name);
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  login = (e) => {
    const { history, setLoginUser } = this.props;
    e.preventDefault();
    const { email, password } = this.state;
    console.log(this.state);
    if (email && password) {
      axios
        .post("http://localhost:5000/user/signin", this.state)
        .then((res) => {
          alert(res.data.message);
          setLoginUser(res.data.user);
          history.push("/");
        });
    } else {
      alert("invalid input");
    }
  };

  render() {
    const { history } = this.props;
    return (
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
            onChange={this.handleChange} style={{width:"80%"}}
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
            style={{width:"80%"}}
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
    );
  }
}

export default withRouter(Login);
