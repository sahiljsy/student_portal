import React, { Component } from "react";
import styles from "./header.module.css";
import Logo from "../../img/logo.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

toast.configure();
library.add(fas);

export class LoginHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div id="header" className={styles.header}>
        <img src={Logo} alt="" id="logo" className={styles.logo} />
      </div>
    );
  }
}

export default LoginHeader;
