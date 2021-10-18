import React, { Component } from "react";
import { withRouter } from "react-router";
import styles from "./home.module.css";
import { Sidebar } from "../sidebar/sidebar";
import Notice from "../notice/notice";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";
import Header from '../header/header'
library.add(fas);
toast.configure();

class Home extends Component {
  constructor(props) {
    super(props);
    this.changestate = this.changestate.bind(this);
    this.state = {
      notices: [],
      isdeleted: false,
    };
  }

  changestate() {
    try {
      axios({
        headers: { token: localStorage.getItem("accessToken") },
        method: "get",
        url: "/notice/getall",
      }).then((res) => {
        if (res.data.error) {
          toast.error(res.data.error, {
            position: "top-center",
            theme: "colored",
          });
        } else {
          this.setState({ notices: res.data.notices });
        }
      });
    } catch (error) {
      toast.error("Invalid Access", {
        position: "top-center",
        theme: "colored",
      });
    }
  }

  componentDidMount() {
    document.body.style.backgroundImage = "url('')";
    const { user } = this.props;
    // console.log(this.props);
    try {
      axios({
        headers: { token: localStorage.getItem("accessToken") },
        method: "get",
        url: "/notice/getall",
      }).then((res) => {
        if (res.data.error) {
          toast.error(res.data.error, {
            position: "top-center",
            theme: "colored",
          });
        } else {
          this.setState({ notices: res.data.notices });
        }
      });
      if (user.role === "student") {
        let addNotice = document.getElementById("notice_add_card");
        addNotice.remove();
      }
    } catch (error) {
      toast.error("Invalid Access", {
        position: "top-center",
        theme: "colored",
      });
    }


  }


  render() {
    const { user } = this.props;
    const notice = this.state.notices;
    // console.log("In home")
    // console.log(this.props)
    // console.log(this.state)
    return (
      <>
        <Header user={user} />
        <div className={styles.main_content}>
          <Sidebar user={user} />
          <div id="notice-container" className={styles.notice_container}>
            <div id="notice_add_card" className={styles.notice_card}>
              <div className={`${styles.add_notice} ${styles.text_center}`}>
                <a href="/noticeform">
                  <FontAwesomeIcon
                    icon={["fas", "plus"]}
                    className={styles.add_notice}
                  />
                </a>
              </div>
            </div>
            {notice.map((n) => (
              <Notice notice={n} key={n._id} user={user} history={this.props.history} changestate={this.changestate} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Home);
