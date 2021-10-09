import React, { Component } from "react";
import styles from "../subject/subject.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);
export default class StudentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: this.props.student,
    };
  }

  render() {
    // console.log(this.state)
    const { student } = this.state;
    return (
      <div className={styles.card}>
        <FontAwesomeIcon
          icon={["fas", "user"]}
          className={styles.card_img}
        />
        <p className={styles.card_title}>
          <p>{student.name}</p>
          <br />
        </p>
      </div>
    );
  }
}
