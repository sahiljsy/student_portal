import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./updatenoticeform.module.css";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accesssdenied from "../accessdenied/accessdenied";
import Header from '../header/header'

class updatenoticeform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notice: this.props.location.state,
      title: this.props.location.state.title,
      content: this.props.location.state.content,
      attachment: "",
      userid: this.props.user.id,
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  updateNotice = (e) => {
    const { history } = this.props;
    const { title, content } = this.state;
    e.preventDefault();
    // console.log(this.state.userid);
    try {
      if (this.state.userid) {
        if (title && content) {
          axios({
            method: "POST",
            data: this.state,
            url: "/notice/update",
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
              history.push("/");
            }
          });
        } else {
          toast.error("Notice title and information are required", {
            position: "top-center",
            theme: "colored",
          });
        }
      } else {
        toast.error("You can not update Notice!", {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  render() {
    const user = this.props.user;
    // console.log(this.props.location.state.title);
    if (user.role === "student") {
      return <Accesssdenied />;
    }
    return (
      <>
        <Header user={this.props.user} />
        <div className={styles.main_content}>
          <Sidebar user={user} />

          <div className={styles.border_box}>
            <form>
              <div className={styles.row}>
                <div className={styles.col1}>
                  <label>Notice Title: </label>
                </div>
                <div className={styles.col2}>
                  <input
                    name="title"
                    type="text"
                    id="noticetitle"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col1}>
                  <label>Notice Information: </label>
                </div>
                <div className={styles.col2}>
                  <textarea
                    id="subject"
                    name="content"
                    value={this.state.content}
                    onChange={this.handleChange}
                  ></textarea>
                </div>
              </div>
              <div className={styles.row}>
                <input type="submit" value="Update"  onClick={this.updateNotice} />
                <a href="/"><input type="button" value="Cancel" /></a>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(updatenoticeform);
