import React, { Component } from "react";
import { Sidebar } from "../sidebar/sidebar";
import styles from "./adminreg.module.css";
import { Redirect } from "react-router";

export default class AdminReg extends Component {
  render() {
    if(localStorage.getItem("accessToken")){
      return <Redirect to={'/admin'}/>
    }
    return (
      <div className={styles.main_content}>
        <Sidebar />
        <div className={styles.border_box}>
          <div className={styles.row}>
            <div className={styles.col1}>
              <label>Name :</label>
            </div>
            <div className={styles.col2}>
              <input type="text" id="name" placeholder="Name" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col1}>
              <label>Email :</label>
            </div>
            <div className={styles.col2}>
              <input type="email" name="email" placeholder="abc@gmail.com" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col1}>
              <label>User Name :</label>
            </div>
            <div className={styles.col2}>
              <input type="text" name="username" placeholder=" User Name" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col1}>
              <label>Password: </label>
            </div>
            <div className={styles.col2}>
              <input type="password" name="password" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col1}>
              <label>Re-enter Password: </label>
            </div>
            <div className={styles.col2}>
              <input type="password" name="repassword" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col1}>
              <label>Contact No :</label>
            </div>
            <div className={styles.col2}>
              <input type="Number" name="contact" placeholder="0123456789" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col1}>
              <label>Role :</label>
            </div>
            <div className={styles.col2}>
              <input type="text" name="role" placeholder="Role Of User" />
            </div>
          </div>
          <div className={styles.row}>
            <input type="submit" value="Submit" style={{ float: "left" }} />
            <input type="button" value="Cancel" />
          </div>
        </div>
      </div>
    );
  }
}
