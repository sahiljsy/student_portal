import React, { Component } from "react";
import styles from "./notice.module.css";
import { Link, withRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
library.add(fas);
toast.configure();

class Notice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notice: this.props.notice,
      title: this.props.notice.title,
      content: this.props.notice.content
    };
    // console.log(this.props)
  }

  deleteNotice = (e) => {
    // console.log('inside notice')
    // console.log(this.props.history)
    
    axios({
      method: 'DELETE',
      data: this.state,
      url: '/notice/delete'
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
          this.props.changestate()
        //this.props.history.push("/")
      }
  })
  }

  updateNotice = (e) => {
    const { title, content } = this.state;
    e.preventDefault();
    try {
      if (!title || !content) {
          toast.error("All Fields must be provided.", {
              position: "top-center",
              theme: "colored",
          });
      }
      else {
          axios({
              method: 'POST',
              data: this.state,
              url: '/notice/update'
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
              }
          })
      }
  } catch (error) {
      toast.error(error.message, {
          position: "top-center",
          theme: "colored",
      });
  }
  }

  render() {
    // console.log(this.props)

    let displayButtons = () => {
      if (notice.userid.email=== this.props.user.email) {
        return (
          <div style={{marginTop: "50%"}}>
            <Link
              to={{
                pathname: "/updatenotice",
                state: this.state
              }}
            ><input style={{backgroundColor:"lightblue"}} type="button" value="Update" /></Link>
            <input type="button" value="Delete" onClick={this.deleteNotice} style={{float:"left"}}/>
          </div>
        );
      }
    };

    const notice = this.props.notice;
    // console.log("In history")
    //  console.log(this.props);
    return (
      <div className={styles.notice_card}>
        <div className={`${styles.notice_header} ${styles.text_center}`}>
          {notice.title}
        </div>
        <div className={styles.notice}>
          {notice.content}
          {displayButtons()}<br/>
          <div className={styles.notice_footer}>
            posted {moment(notice.updatedAt).fromNow()} By {notice.userid.name}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Notice);
