import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./joinclass.module.css";
import Sidebar from "../sidebar/sidebar";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../header/header";
import Accessdenied from "../accessdenied/accessdenied";

toast.configure();
class noticeform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classCode: "",
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

  componentDidMount() {
    document.body.style.backgroundImage = "url('')";
  }
  joinClass = (e) => {
    const { history } = this.props;
    e.preventDefault();
    try {
      if (this.state.userid) {
        if (this.state.classCode) {
          const len = this.state.classCode.length;
          if (len === 7) {
            axios({
              method: "post",
              data: this.state,
              url: "/subject/addStudent",
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
                  autoClose: 2000
                });
                history.push("/mysubject");
              }
            });
          } else {
            toast.error("Enter valid class code", {
              position: "top-center",
              theme: "colored",
            });
          }
        } else {
          toast.error("class code is required", {
            position: "top-center",
            theme: "colored",
          });
        }
      } else {
        toast.error("you can't join class", {
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
    if (this.props.user.role === "faculty" || this.props.user.role === "admin") {
      return <Accessdenied />;
    }
    return (
      <>
        <Header user={this.props.user} />
        <div className={styles.main_content}>
          <Sidebar user={this.props.user} />

          <div className={styles.border_box}>
          <p style={{fontSize: "40px",marginTop:"15px",fontWeight: "bolder",textAlign:"center"}}><u>JOIN CLASS</u></p>
            <form>
              <div className={styles.row}>
                <div className={styles.col1}>
                  <label>Class code: </label>
                </div>
                <div className={styles.col2}>
                  <input
                    type="text"
                    id="classcode"
                    name="classCode"
                    value={this.state.classCode}
                    placeholder="Enter class code here"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className={styles.row}>
                <input
                  type="submit"
                  value="Join class"
                  onClick={this.joinClass}
                />
                <input type="button" value="Back" />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(noticeform);
