import React, { Component } from "react";
import styles from "./subject.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import { withRouter } from "react-router-dom";

library.add(fas);
class AssignmentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment: this.props.assignment,
      creator: this.props.creator,
    };
  }

  deleteAssignment = (e) => {
    const { history } = this.props;

    axios({
      method: "DELETE",
      data: this.state,
      url: "/assignment/delete",
    }).then((res) => {
      if (res.data.error) {
        toast.error(res.data.error, {
          position: "top-center",
          theme: "colored",
        });
      } else {
        toast.success(res.data.success, {
          position: "top-center",
          theme: "colored",
        });
        history.goBack();
      }
    });
  };

  render() {
    // console.log(this.state)
    const { assignment, creator } = this.state;

    // console.log(this.props.user.id)
    // console.log(this.state.assignment._id)

    let displayButtons = () => {
      if (this.state.assignment.user === this.props.user.id) {
        return (
          <>
            <a href={`/mysubject/viewsubmissions/${this.state.assignment._id}`}>
              <input
                type="button"
                value="View Submissions"
                style={{ margin: "2%", backgroundColor: "lightblue" }}
              />
            </a>
            <input
              type="button"
              value="Delete"
              onClick={this.deleteAssignment}
              style={{ float: "right", margin: "2%" }}
            />
          </>
        );
      }
    };

    return (
      <div className={styles.card}>
        <FontAwesomeIcon
          icon={["fas", "file-alt"]}
          className={styles.card_img}
        />
        <p className={styles.card_title}>
          <a
            href={`/mysubject/assignment/${assignment._id}/${assignment.type}`}
          >
            {creator} Posted New {assignment.type}: {assignment.title}
          </a>
          <br />
          <span>posted {moment(assignment.createdAt).fromNow()}</span>
        </p>
        {displayButtons()}
      </div>
    );
  }
}

export default withRouter(AssignmentCard);
