import React, { Component } from "react";
import styles from "./home.module.css";
import { Sidebar } from "../sidebar/sidebar";
import { Notice } from "../notice/notice";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { setLoginUser, user } = this.props;
    return (
      <div className={styles.main_content}>
        <Sidebar />
        <Notice />
      </div>
    );
  }
}

export default Home;
