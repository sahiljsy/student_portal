import React, { Component } from "react";
import styles from "./subject.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AssignmentCard from "./AssignmentCard";
import Header from '../header/header'
library.add(fas);
toast.configure();
export class Subject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject_id: "",
      subject: {},
      attachments: [],
      user: this.props.user,
      creator:""
    };
  }

  componentDidMount() {
    if (this.props.user.role === "student") {
      let class_nav = document.getElementById("class_nav");
      if(class_nav){
        class_nav.remove();
      }
      let welcome_msg = document.getElementById("welcome_msg");
      if(welcome_msg){
        welcome_msg.innerHTML = "New Assignment /material will be display here"
      }
    }
    // let queries = queryString.parse(this.props.location.search);
    this.setState({ subject_id: this.props.match.params.id });
    // console.log(this.props);
    try {
      axios({
        method: "POST",
        data: { subject: this.props.match.params.id  },
        url: "/assignment/getall",
      }).then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
          toast.error(res.data.error, {
            position: "top-center",
            theme: "colored",
          });
        } else {
          this.setState({
            attachments: res.data.subject.attachments,
            subject: res.data.subject,
            creator: res.data.creator
          });

          if (res.data.subject.attachments.length != 0) {
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
    const subject = this.state.subject;
    const attachments = this.state.attachments;
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
              <a
                href={`/mysubject/addassignment?type=assignment&usv=${this.state.subject_id}`}
              >
                Add Assignment
              </a>
            </li>
            <li>
              <a
                href={`/mysubject/addassignment?type=material&usv=${this.state.subject_id}`}
              >
                Add Material
              </a>
            </li>
            <li>
              <a href="#">People</a>
            </li>
          </ul>
        </div>
        <div id="welcome_msg" className={styles.class_welcome}>
          Create new Assignment/ material
        </div>
        {attachments.map((a) => (
          <AssignmentCard
            assignment={a}
            creator={this.state.creator}
            user={this.props.user}
            key={a._id}
          />
        ))}
      </div>
      </>
    );
  }
}

export default withRouter(Subject);
