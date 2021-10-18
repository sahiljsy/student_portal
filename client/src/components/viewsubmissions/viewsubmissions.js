import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../header/header";
import styles from "../subject/subject.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import download from "downloadjs";


library.add(fas);
toast.configure();
class Viewsubmissions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      assignment_id: "",
      user: this.props.user,
      submissions: [],

      //   user_id: "",
      //   filename: ""
    };

    try {
      axios({
        method: "POST",
        data: { assignment_id: this.props.match.params.id },
        url: "/submission/getallsubmission",
      }).then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
          toast.error(res.data.error, {
            position: "top-center",
            theme: "colored",
          });
        } else {
          // console.log(res.data);
          this.setState({
            submissions: res.data.submissions,
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }


  }

  downloadFile = async (e, s) => {
    e.preventDefault();
    // console.log("downloadfile")
    // console.log(s._id)
    try {
      const result = await axios.get(
        `submission/downloadFile/${s._id}`,
        {
          responseType: "blob",
        }
      );
      // console.log(result.data);
      // console.log(s.filename)
      // console.log(result.data.type);
      //console.log(this.state.assignment.filename);
      return download(
        result.data,
        s.filename,
        result.data.type
      );
    } catch (error) {
      console.log(error.message);
      toast.error("Unable to download file", {
        position: "top-center",
        theme: "colored",
      });
    }
  };


  componentDidMount() {
    document.body.style.backgroundImage = "url('')";
    // console.log(this.props.match.params.id);

    this.setState({ assignment_id: this.props.match.params.id });
    // console.log(this.state.assignment_id);

  }



  render() {
    var submissions = this.state.submissions;

    let checklength = () => {
      if (this.state.submissions.length === 0) {
        return (
          <div className={styles.card}>
            <h2 ><center>
              No Submissions!
            </center>  </h2>
          </div>
        );
      }
    };

    return (
      <>
        <Header user={this.props.user} />

        <div id="subject-container" className={styles.subject_container}>
          <div id="class_nav" className={styles.class_nav}>
            <ul className={`${styles.noListStyle} ${styles.horizontalList}`}>
              <li>
                Total Submissions: {submissions.length}
              </li>
            </ul>
          </div>
          {/* <div id="welcome_msg" className={styles.class_welcome}>
                        No Submissions!!
                    </div> */}
          {checklength()}

          {submissions.map((s) => (

            <div className={styles.card} style={{ height: 120 }}>
              {console.log(s)}
              {/* {finduser(s,usr)}
                        {console.log(usr.username)} */}
              <FontAwesomeIcon
                icon={["fas", "user"]}
                className={styles.card_img}
              />
              <p className={styles.card_title}>
                <p style={{ fontSize: 20, fontWeight: "bold" }}>{s.user.username} </p>
                <p>
                  <a href="#" onClick={(e) => this.downloadFile(e, s)}>
                    {s.filename}
                  </a>

                </p>

                <br />
              </p>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default withRouter(Viewsubmissions);
