import React, { Component } from "react";
import styles from "./assignment.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Header from "../header/header";
import { toast } from "react-toastify";
import download from "downloadjs";

library.add(fas);
toast.configure();
class Assignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      assignment_type: "",
      assignment_id: "",
      progress: 0,
      filename: {},
      assignment: {},
    };
  }
  handleChange = (e) => {
    this.setState({ progress: 0 });
    const file = e.target.files[0]; // accessing file
    console.log(file); // storing file
    this.setState({ filename: file });
  };
  handleButtonClick = (e) => {
    e.preventDefault();
    let btn = document.getElementById("done_btn");
    if (btn.innerHTML === "Mark as Done") {
      this.uploadSubmission(e);
    } else {
      this.unsubmit(e);
    }
  };
  downloadFile = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(
        `assignment/downloadFile/${this.state.assignment_id}`,
        {
          responseType: "blob",
        }
      );
      console.log(result.data);
      console.log(result.data.type);
      console.log(this.state.assignment.filename);
      return download(
        result.data,
        this.state.assignment.filename,
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
  uploadSubmission = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.filename);
    formData.append("assignment_id", this.state.assignment_id);
    formData.append("userid", this.state.user.id);
    console.log(formData);
    axios
      .post("submission/newSubmission", formData, {
        onUploadProgress: (ProgressEvent) => {
          let progres =
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%";
          this.setState({ progress: progres });
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          let status = document.getElementById("status");
          let done_btn = document.getElementById("done_btn");
          done_btn.innerHTML = "Unsubmit";
          status.innerHTML = "Submited";
          done_btn.disable = true;
        }
      });
  };

  unsubmit = (e) => {
    alert("unsubmit");
  };
  componentDidMount() {
    if(localStorage.getItem("role") === "admin"){
      document.getElementById("submission").remove();
    }else{
      try {
        axios
          .post("submission/checkSubmission", {
            assignment_id: this.props.match.params.id,
            userid: this.state.user.id,
          })
          .then((res) => {
            if (res.data.success) {
              this.setState({ progress: "100%" });
              let status = document.getElementById("status");
              let done_btn = document.getElementById("done_btn");
              done_btn.innerHTML = "Unsubmit";
              status.innerHTML = "Submited";
              done_btn.disable = true;
              document.getElementById("uploadedfile").innerHTML = res.data.name;
              document.getElementById("submited").style.display = 'inlineblock';
            } else {
              let submitedfile_box = document.getElementById("submited");
              submitedfile_box.style.display = 'none';
            }
          });
      } catch (error) {
        console.log(error.message);
      }
    }
    document.body.style.backgroundImage = "url('')";
    this.setState({
      assignment_id: this.props.match.params.id,
      assignment_type: this.props.match.params.type,
    });
    axios
      .post("assignment/getAttachment", {
        assignment_id: this.props.match.params.id,
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          this.setState({ assignment: res.data.assignment });
          // console.log(res.data.assignment);
        }
      });
    

    if (this.props.match.params.type === "material") {
      var submission_box = document.getElementById("submission");
      if (submission_box) {
        submission_box.remove();
      }
    }
  }
  render() {
    let assignment = this.state.assignment;
    let date_day = new Date(assignment.createdAt).getDate();
    let date_month = new Date(assignment.createdAt).toLocaleString("en-us", {
      month: "short",
    });

    return (
      <>
        <Header user={this.props.user} />
        <div className={styles.subject_container}>
          <div className={styles.assignment}>
            <FontAwesomeIcon
              icon={["fas", "file-alt"]}
              className={styles.assignment_logo}
            />
            <div className={styles.details}>
              <div className={styles.assignment_info}>
                <p className={styles.assignment_title}>
                  {this.state.assignment_type.toUpperCase()}
                </p>
                <p>
                  {assignment.creator} &nbsp;&nbsp;&nbsp;[{date_day}{" "}
                  {date_month}]
                </p>
                <div>
                  <div className={styles.points}>
                    {assignment.points} points
                  </div>
                  <div className={styles.due_to}>
                    {" "}
                    Due {moment(assignment.dueDate).fromNow()}
                  </div>
                </div>
              </div>
              <div className={styles.assignment_attachment}>
                <div className={styles.front_page}></div>
                <div className={styles.file_title}>
                  <a href="#" onClick={this.downloadFile}>
                    {assignment.filename}
                  </a>
                </div>
              </div>
              <hr />
            </div>
            <div className={styles.assignment_submit} id="submission">
              <div className={styles.submit}>
                <div className={styles.submit_title}>YOUR WORK</div>
                <div className={styles.submit_status} id="status">
                  Pending
                </div>
                <div className={styles.submit_form}>
                  <form>
                    <input
                      type="file"
                      id="ans-file"
                      onChange={this.handleChange}
                    />
                    <div
                      className={styles.progessBar}
                      style={{
                        width: this.state.progress,
                        backgroundColor: "green",
                      }}
                    >
                      <center>{this.state.progress}</center>
                    </div>
                    <div className={styles.assignment_attachment} id="submited">
                      <div className={styles.front_page}></div>
                      <div className={styles.file_title}>
                        <p  id="uploadedfile">
                          
                        </p>
                      </div>
                    </div>
                    <button
                      id="done_btn"
                      type="submit"
                      className={styles.button}
                      onClick={this.handleButtonClick}
                    >
                      Mark as Done
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Assignment);
