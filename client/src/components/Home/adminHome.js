import React, { Component } from "react";
import Sidebar from "../sidebar/sidebar";
import styles from "./home.module.css"

export class AdminHome extends Component {
  render() {
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
