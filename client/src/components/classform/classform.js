import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./classform.module.css";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import Accesssdenied from "../accessdenied/accessdenied";

toast.configure();

class classform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      credit:5,
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
  formatNumber = (e) => {
    const num = this.state.credit
    this.setState({
        credit: parseInt(num)
    })
  }

  createClass = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { title, credit } = this.state;
    // console.log(this.state)
    try {
      if (this.state.userid) {
        if (title && credit) {
          axios({
            method: "POST",
            data: this.state,
            url: "/subject/create",
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
              history.push("/mysubject");
            }
          });
        }
      } else {
        toast.error("You can not create subject!", {
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
    if(this.props.user.role ==="student"){
      return <Accesssdenied />
    }
    return (
      <div className={styles.main_content}>
        <Sidebar />

        <div className={styles.border_box}>
          <form>
            <div className={styles.row}>
              <div className={styles.col1}>
                <label>Title: </label>
              </div>
              <div className={styles.col2}>
                <input
                  type="text"
                  name="title"
                  id="classtitle"
                  placeholder="Title"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col1}>
                <label>Credits: </label>
              </div>
              <div className={styles.col2}>
                <input
                  type="number"
                  name="credit"
                  value={this.state.credit}
                  className={styles.credit}
                  onChange={this.handleChange}
                  onBlur={this.formatNumber}
                />
              </div>
            </div>
            <div className={styles.row}>
              <input type="submit" value="Submit" onClick={this.createClass} />
              <input type="button" value="Cancel" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(classform);
