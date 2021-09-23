import React, { Component } from "react";
import styles from "./notice.module.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import moment from "moment";
library.add(fas);
toast.configure();

export class Notice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notice: this.props.notice,
    };
  }

  render() {
    const notice = this.props.notice;
    console.log(notice);
    return (
      <div className={styles.notice_card}>
        <div className={`${styles.notice_header} ${styles.text_center}`}>
          {notice.title}
        </div>
        <div className={styles.notice}>
          {notice.content}
          <div className={styles.notice_footer}>
            posted {moment(notice.createdAt).fromNow()} By {notice.userid.name}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Notice);
