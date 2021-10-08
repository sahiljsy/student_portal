import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./subject.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

library.add(fas);
export default class AssignmentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment: this.props.assignment,
      creator: this.props.creator,
    };
  }

  render() {
    // console.log(this.state)
    const { assignment, creator } = this.state;
    return (
      <div className={styles.card}>
        <FontAwesomeIcon
          icon={["fas", "file-alt"]}
          className={styles.card_img}
        />
        <p className={styles.card_title}>
          <a href={`/mysubject/assignment/${assignment._id}/${assignment.type}`}>
            {creator} Posted New {assignment.type}: {assignment.title}
          </a>
          <br />
          <span>posted {moment(assignment.createdAt).fromNow()}</span>
        </p>
      </div>
    );
  }
}
