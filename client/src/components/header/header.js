import React, { Component } from "react";
import styles from "./header.module.css";
import Logo from "../../img/logo.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

toast.configure();
library.add(fas);

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const user = this.props.user;
    if (user.role === "student" || user.role === "faculty") {
      let admin_sidebar = document.getElementById("admin_dropdown");
      admin_sidebar.remove();
    } else if(user.role === "admin"){
      let student_sidebar = document.getElementById("student_dropdown");
      student_sidebar.remove();
    }
  }

  handleLogout = () => {
    localStorage.clear();
    toast.success("You have Logged out!!", {
      position: "top-center",
      theme: "colored",
    });
  };

  render() {
    const { user } = this.props;
    return (
      <div id="header" className={styles.header}>
        <img src={Logo} alt="" id="logo" className={styles.logo} />
        <a href="/userdetails" style={{ color: "white" }}>
          <p id="tag" className={styles.tag}>
            {user.username}
          </p>{" "}
        </a>
        <div className={styles.dropdown_menu}>
          <div className={styles.bars}>
            <FontAwesomeIcon
              icon={["fas", "bars"]}
              className={styles.bars_icon}
            />
          </div>
          <div
            id="student_dropdown"
            className={`${styles.dropdown_list} ${styles.nav_menu}`}
          >
            <ul className={styles.no_list_style}>
              <li>
                <a href="/userdetails">{user.username}</a>
              </li>
              <hr />
              <li>
                <a href="/">HOME</a>
              </li>
              <hr />
              <li>
                <a href="/result">RESULTS</a>
              </li>
              <hr />
              <li>
                <a href="/mysubject">MY SUBJECTS</a>
              </li>
              <hr />
              <li>
                <a href="/contactus">ABOUT US</a>
              </li>
              <hr />
              <li>
                <a href="/" onClick={this.handleLogout}>
                  LOGOUT
                </a>
              </li>
            </ul>
          </div>
          <div
            id="admin_dropdown"
            className={`${styles.dropdown_list} ${styles.nav_menu}`}
          >
            <ul className={styles.no_list_style}>
              <li>
                <a href="/userdetails">{user.username}</a>
              </li>
              <hr />
              <li>
                <a href="/admin">HOME</a>
              </li>
              <hr />
              <li>
                <a href="/admin/register">ADD NEW USER</a>
              </li>
              <hr />
              <li>
                <a href="/admin/subject">SUBJECT</a>
              </li>
              <hr />
              <li>
                <a href="/noticeform">ADD NOTICE</a>
              </li>
              <hr />
              <li>
                <a href="/contactus">ABOUT US</a>
              </li>
              <hr/>
              <li>
                <a href="/" onClick={this.handleLogout}>
                  LOGOUT
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
