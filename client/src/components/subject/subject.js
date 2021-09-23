import React, { Component } from "react";
import styles from "./subject.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

export default class Subject extends Component {
  render() {
    return (
      <div id="subject-container" className={styles.subject_container}>
        
        <div className={styles.class_header}>
          <p className={styles.class_header_title}>CE_V_Sem_AT</p>
          <p>credit:5</p>
          <p>Class Code:</p>
        </div>
        <div className={styles.class_nav}>
          <ul className={`${styles.noListStyle} ${styles.horizontalList}`}>
            <li>
              <a href="#">Add Assignment</a>
            </li>
            <li>
              <a href="#">Add Material</a>
            </li>
            <li>
              <a href="#">People</a>
            </li>
          </ul>
        </div>
        <div className={styles.card}>
          <FontAwesomeIcon
            icon={["fas", "file-alt"]}
            className={styles.card_img}
          />
          <p className={styles.card_title}>
            <a href="/mysubject/assignment">
              JSY posted new assignment:Assignment 1
            </a>
          </p>
        </div>
        <div className={styles.card}>
          <FontAwesomeIcon
            icon={["fas", "file-alt"]}
            className={styles.card_img}
          />
          <p className={styles.card_title}>
            JSY posted new assignment:Assignment 1
          </p>
        </div>
        <div className={styles.card}>
          <FontAwesomeIcon
            icon={["fas", "file-alt"]}
            className={styles.card_img}
          />
          <p className={styles.card_title}>
            JSY posted new assignment:Assignment 1
          </p>
        </div>
      </div>
    );
  }
}
