import React, { Component } from "react";
import styles from "./assignment.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

export default class Assignment extends Component {
  render() {
    return (
      <div className={styles.subject_container}>
        <div className={styles.assignment}>
          <FontAwesomeIcon
            icon={["fas", "file-alt"]}
            className={styles.assignment_logo}
          />
          <div className={styles.details}>
            <div className={styles.assignment_info}>
              <p className={styles.assignment_title}>Assignment 1</p>
              <p>JSY &nbsp;&nbsp;&nbsp;[12 mar]</p>
              <div>
                <div className={styles.points}>100 points</div>
                <div className={styles.due_to}>Due 19 mar</div>
              </div>
            </div>
            <div className={styles.assignment_attachment}>
              <div className={styles.front_page}></div>
              <div className={styles.file_title}>
                <a href="#">Assignment 1</a>
                <p>pdf</p>
              </div>
            </div>
            <hr />
          </div>
          <div className={styles.assignment_submit}>
            <div className={styles.submit}>
              <div className={styles.submit_title}>YOUR WORK</div>
              <div className={styles.submit_status}>Turn-in</div>
              <div className={styles.submit_form}>
                <form>
                  <input type="file" id="ans-file" />
                  <button
                    type="submit"
                    className={styles.button}
                  >Turn In</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
