import React, { Component } from "react";
import { Sidebar } from "../sidebar/sidebar";
import styles from "./mysubject.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import SubjectCard from './subjec_card'
import Header from '../header/header'
library.add(fas);
export default class Mysubject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirct: "",
      subjects:[]
    };
  }
  componentDidMount() {
    document.body.style.backgroundImage = "url('')";
    try {
      axios({
        method: "post",
        data: { userid: this.props.user.id },
        url: "/user/getmysubject",
      }).then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          // console.log(res.data.mysubject);
          this.setState({subjects:res.data.mysubject});
        }
      });
    } catch (error) {
      console.log(error.message);
    }
    if (this.props.user.role === "student") {
      this.setState({ redirct: "/mysubject/joinclass" });
    } else {
      this.setState({ redirct: "/mysubject/classform" });
    }
  }
  render() {
    const subjects = this.state.subjects
    return (
      <>
      <Header user={this.props.user} />
      <div className={styles.main_content}>
        <Sidebar user={this.props.user}/>
        <div className={styles.subject_container}>
          <div className={styles.card}>
            <div className={`${styles.add_subject} ${styles.text_center}`}>
              <a href={this.state.redirct}>
                <FontAwesomeIcon
                  icon={["fas", "plus"]}
                  className={styles.add_subject}
                />
              </a>
            </div>
          </div>
          {subjects.map((s) => (
            <SubjectCard  subject={s} key={s._id}/>
          ))}
          
        </div>
      </div>
      </>
    );
  }
}

