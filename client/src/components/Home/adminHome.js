import React, { Component } from "react";
import Sidebar from "../sidebar/sidebar";
import styles from "./home.module.css"
import { Redirect } from "react-router";

export class AdminHome extends Component {
  render() {
    if(!localStorage.getItem("accessToken")){
      return <Redirect to={'/login'}/>
    }
    return (
      <div className={styles.main_content}>
        <Sidebar />
        <div>
          <p>hi Admin</p>
        </div>
      </div>
    );
  }
}

export default AdminHome;
