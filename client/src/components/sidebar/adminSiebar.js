import React, { Component } from "react";
import styles from "./sidebar.module.css";
import { withRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

export class AdminSidebar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       result:"",
    }
  }
  
  render() {
    
    return (
      <div className={styles.sidebar}>
        <nav id="student" className={styles.student}>
          <ul>
            <li>
              <FontAwesomeIcon icon={["fas", "home"]} className={styles.icon} />
              <a href="/">HOME</a>
            </li>
            <hr />
            <li>
              <FontAwesomeIcon icon={["fas", "poll"]} className={styles.icon} />
              <a href="/result">RESULTS</a>
            </li>
            <hr />
            <li>
              <FontAwesomeIcon icon={["fas", "book"]} className={styles.icon} />
              <a href="/mysubject">MY SUBJECTS</a>
            </li>
            <hr />
            <li>
              <FontAwesomeIcon
                icon={["fas", "id-card"]}
                className={styles.icon}
              />
              <a href="#">CONTACT US</a>
            </li>
            <hr />
            <li>
              <FontAwesomeIcon
                icon={["fas", "sign-out-alt"]}
                className={styles.icon}
              />
              <a href="/login" onClick={()=> {localStorage.clear()}}>LOG OUT</a>
            </li>
            <hr />
          </ul>
        </nav>
        <nav className={styles.admin}>
          <ul>
            <li>
              <FontAwesomeIcon icon={["fas", "home"]} className={styles.icon} />
              <a href="/admin">HOME</a>
            </li>
            <hr />
            <li>
              <FontAwesomeIcon
                icon={["fas", "user-plus"]}
                className={styles.icon}
              />
              <a href="/admin/register">ADD USER</a>
            </li>
            <hr />
            <li>
              <FontAwesomeIcon icon={["fas", "book"]} className={styles.icon} />
              <a href="/admin/subject">SUBJECTS</a>
            </li>
            <hr />
            <li>
              <FontAwesomeIcon icon={["fas", "file"]} className={styles.icon} />
              <a href="/noticeform">ADD NOTICE</a>
            </li>
            <hr />
            <li>
              <FontAwesomeIcon
                icon={["fas", "sign-out-alt"]}
                className={styles.icon}
              />
              <a href="/login" onClick={()=> {localStorage.clear()}}>LOG OUT</a>
            </li>
            <hr />
          </ul>
        </nav>
      </div>
    );
  }
}


export default withRouter(AdminSidebar);
