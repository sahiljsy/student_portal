import React, { Component } from "react";
import styles from "../subject/subject.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../header/header";
import StudentCard from "./studentCard";

library.add(fas);
toast.configure();
export class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject_id: "",
      students: [],
      user: this.props.user,
      creator: "",
      subject: {},
    };
  }

  componentDidMount() {
    document.body.style.backgroundImage = "url('')";

    this.setState({ subject_id: this.props.match.params.id });
    console.log(this.props);
    try {
      axios({
        method: "POST",
        data: { subject: this.props.match.params.id },
        url: "/subject/getStudent",
      }).then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
          toast.error(res.data.error, {
            position: "top-center",
            theme: "colored",
          });
        } else {
          console.log(res.data);
          this.setState({
            subject: res.data.subject,
            students: res.data.students,
          });

          if (res.data.students.length !== 0) {
            console.log(res.data.subject.attachments);
            let x = document.getElementById("welcome_msg");
            if (x) {
              x.remove();
            }
          }
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    console.log(this.state);
    const subject = this.state.subject;
    const students = this.state.students;
    return (
      <>
        <Header user={this.props.user} />
        <div id="subject-container" className={styles.subject_container}>
          <div className={styles.class_header}>
            <p className={styles.class_header_title}>{subject.title}</p>
            <p>Class Code: {subject.classCode}</p>
            <p>credit: {subject.credit}</p>
          </div>
          <div id="class_nav" className={styles.class_nav}>
          <ul className={`${styles.noListStyle} ${styles.horizontalList}`}>
            <li>
                Total student: {students.length}
            </li>
          </ul>
        </div>
          <div id="welcome_msg" className={styles.class_welcome}>
            No one has joined class!!
          </div>

          {students.map((s) => (
            <StudentCard key={s._id} student={s} />
          ))}
        </div>
      </>
    );
  }
}

export default withRouter(People);
