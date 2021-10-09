import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./mysubject.module.css";

export default class SubjectCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: this.props.subject,
    };
  }

  render() {
    const subject = this.state.subject;
    return (
      <>
      
        <div className={styles.card}>
          <div className={`${styles.card_header} ${styles.text_center}`}>
            <Link to={`/mysubject/subject/${subject._id}`}>
              {subject.title}
            </Link>

            {/* <a href={url}>{subject.title}</a> */}
          </div>
          <div className={styles.footer}>credit: {subject.credit}</div>
        </div>
      </>
    );
  }
}
