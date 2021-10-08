import React, { Component } from "react";
import styles from "./viewpeople.module.css";
import { Sidebar } from "../sidebar/sidebar";
import { Notice } from "../notice/notice";
import { Redirect } from "react-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";

export class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "/student/getall",
    }).then((res) => {
      if (res.data.error) {
        toast.success(res.data.error, {
          position: "top-center",
          theme: "colored",
        });
      } else {
        this.setState({ people: res.data.people });
        // console.log(this.state.notices);
      }
    });
  }

  render() {
    const { user } = this.props;
    const people = this.state.people;
    // console.log(user);
    return (
      <div className={styles.main_content}>
        <Sidebar />
        <div>
          {people.map((n) => (
            n.name
          ))}
        </div>
      </div>
    );
  }
}

export default People;
