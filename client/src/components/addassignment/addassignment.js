import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import Accesssdenied from "../accessdenied/accessdenied";
import styles from "./addassignment.module.css";

class addassignment extends Component {
  render() {
    if (this.props.user.role === "student") {
      return <Accesssdenied />;
    }
    return (
      <>
        <form>
          <br />
          <h1>
            <i className="far fa-file-alt"></i> &nbsp; ASSIGNMENT
          </h1>
          <input type="button" value="Delete" />
          <input type="submit" value="Assign" />
          <br />
          <hr className={styles.hrtag} />
          <div className={styles.content}>
            <div className={styles.data}>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <i className="fas fa-tasks" id="icon"></i>
                  <label> Title:</label>
                </div>
                <div className={styles.col_75}>
                  <input type="text" name="title" placeholder="Title" />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.col_25}>
                  <i className="far fa-calendar-minus" id="icon"></i>
                  <label> Description:</label>
                </div>
                <div className={styles.col_75}>
                  <textarea
                    name="instructions"
                    placeholder="Description"
                  ></textarea>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <i className="fas fa-file-alt" id="icon"></i>
                  <label> File to add:</label>
                </div>
                <div className={styles.col_75}>
                  <input type="file" name="file" />
                </div>
              </div>
            </div>

            <div className={styles.parameters}>
              <i className="fas fa-calendar-day" id="icon"></i>
              <label>Due date: </label>
              <input type="date" name="duedate" />
              <br />
              <br />
              <i className="far fa-clock" id="icon"></i>
              <label>Due time: </label>
              <input type="time" name="duetime" />
              <br />
              <br />
              <i className="fas fa-award" id="icon"></i>
              <label>Points: </label>
              <input type="number" name="points" />
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(addassignment);
