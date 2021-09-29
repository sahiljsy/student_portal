import React, { Component } from "react";
import styles from "./home.module.css";
import { Sidebar } from "../sidebar/sidebar";
import { Notice } from "../notice/notice";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";

library.add(fas);
toast.configure();

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notices: [],
    };
  }

  componentDidMount() {
    const { user } = this.props;
    axios({
      method: "get",
      url: "/notice/getall",
    }).then((res) => {
      if (res.data.error) {
        toast.success(res.data.error, {
          position: "top-center",
          theme: "colored",
        });
      } else {
        this.setState({ notices: res.data.notices });
        // console.log(this.state.notices);
      }
    });
    if(user.role === "student"){
      let addNotice = document.getElementById("notice_add_card");
      addNotice.remove();
    }

  }

  render() {
    const { user } = this.props;
    const notice = this.state.notices;
    // console.log(user.role);
    return (
      <div className={styles.main_content}>
        <Sidebar />
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
            <Notice notice={n} key={n._id}/>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
