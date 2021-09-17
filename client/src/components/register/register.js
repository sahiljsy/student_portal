import React, { Component } from "react";
import styles from"./register.module.css";
import axios from "axios";
import { withRouter } from 'react-router-dom';

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

  register = () => {
    const { history } = this.props;
    const { name, username, password, repassword, email, contact_no } = this.state;
    console.log(this.state);
    if (name && username && password && email && contact_no && (password == repassword) ) {
      axios.post("http://localhost:5000/user/create", this.state)
      .then(res => {
        alert(res.data.message)
        history.push('/login')
      });
    }else{
      alert('invalid input');
    }
  };

  render() {
    const { history } = this.props;
    return (
      <div className={ styles.form_container } >
        <h2>STUDENT INFORMATION</h2>
        <div className={ styles.form_element}>
          <label htmlFor={ styles.middle_name}>
            Name<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div className={ styles.form_element}>
          <label htmlFor="username">
            User Name<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="first-name"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div className={ styles.form_element}>
          <label htmlFor="password">
            Password<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <div className={ styles.form_element}>
          <label htmlFor="repassword">
            Reenter Password<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            id="repassword"
            name="repassword"
            value={this.state.repassword}
            onChange={this.handleChange}
          />
        </div>
        <div className={ styles.form_element}>
          <label htmlFor="email">
            Email<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="abc@gmail.com"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div className={ styles.form_element}>
          <label htmlFor="m-no">
            Contact Number<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="number"
            id="m-no"
            placeholder="1234567890"
            name="contact_no"
            value={this.state.contact_no}
            onChange={this.handleChange}
          />
        </div>
        <div className={ styles.form_element}>
          <button
            type="submit"
            className={styles.btn}
            onClick={this.register}
          >REGISTER</button>
        </div>
        <div className={ styles.form_element}>
          <button type="submit" className={styles.btn} value="LOGIN" onClick={ () =>  history.push('/login')}>LOGIN</button>
        </div>
        
      </div>
    );
  }
}

export default withRouter(Register);
