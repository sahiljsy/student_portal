import React, { Component } from "react";
import styles from "./accessdenied.module.css";
import denied from "../../img/access-denied.gif";
import LoginHeader from "../header/loginHeader";

export default class Accesssdenied extends Component {
  render() {
    return (
      <React.Fragment>
        <LoginHeader />
        <div className={styles.image_div}>
          <img src={denied} alt="" className={styles.photo} />
        </div>
        <div className={styles.message}>ACCESS DENIED!</div>
        <div className={styles.info}>
          We have found an illegal access to our system.
        </div>
        <div className={styles.button}>
          <center>
            <a href="/" className={styles.link}>
              {" "}
              Go to home page
            </a>
          </center>
        </div>
      </React.Fragment>
    );
  }
}
