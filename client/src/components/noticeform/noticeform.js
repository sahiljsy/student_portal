import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./noticeform.module.css";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accesssdenied from "../accessdenied/accessdenied";

class noticeform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
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
  createNotice = (e) => {
    const { history } = this.props;
    const { title, content } = this.state;
    e.preventDefault();
    console.log(this.state.userid);
    try {
      if (this.state.userid) {
        if (title && content) {
          axios({
            method: "POST",
            data: this.state,
            url: "/notice/create",
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
        toast.error("You can not create Notice!", {
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
    if (this.props.user.role === "student") {
      return <Accesssdenied />;
    }
    return (
      <div className={styles.main_content}>
        <Sidebar />

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
                  placeholder="Title"
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
                  placeholder="Specify the details"
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>
                <label>File to upload:</label>
              </div>
              <div className={styles.col2}>
                <input
                  type="file"
                  name="attachment"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <input type="submit" value="Submit" onClick={this.createNotice} />
              <input type="button" value="Cancel" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(noticeform);
