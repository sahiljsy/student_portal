import React, { Component } from "react";
import { withRouter } from "react-router";
import { Sidebar } from "../sidebar/sidebar";
import styles from "./mysubject.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

export default class Mysubject extends Component {
  constructor(props) {
    super(props)

    this.state = {
         
    }
}
  render() {
    return (
      <div className={styles.main_content}>
        <Sidebar />
        <div className={styles.subject_container}>
          <div className={styles.card}>
            <div className={`${styles.add_subject} ${styles.text_center}`}>
              <a href="/mysubject/classform">
                <FontAwesomeIcon
                  icon={["fas", "plus"]}
                  className={styles.add_subject}
                />
              </a>
            </div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.card_header} ${styles.text_center}`}>
            <a href="/mysubject/subject">B.tech CE SEM V SEPP</a>
            </div>
            <div className={styles.footer}>credit: 5</div>
          </div>

          <div className={styles.card}>
            <div className={`${styles.card_header} ${styles.text_center}`}>
            <a href="/mysubject/subject">B.tech CE SEM V SEPP</a>
            </div>
            <div className={styles.footer}>credit: 5</div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.card_header} ${styles.text_center}`}>
              <a href="/mysubject/subject">B.tech CE SEM V SEPP</a>
            </div>
            <div className={styles.footer}>credit: 5</div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.card_header} ${styles.text_center}`}>
              <a href="/mysubject/subject">B.tech CE SEM V SEPP</a>
            </div>
            <div className={styles.footer}>credit: 5</div>
          </div>
          <div className={styles.card}>
            <div className={`${styles.card_header} ${styles.text_center}`}>
              <a href="/mysubject/subject">B.tech CE SEM V SEPP</a>
            </div>
            <div className={styles.footer}>credit: 5</div>
          </div>
        </div>
      </div>
    );
  }
}
