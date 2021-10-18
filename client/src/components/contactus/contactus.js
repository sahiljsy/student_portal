import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "../noticeform/noticeform.module.css"
import "react-toastify/dist/ReactToastify.css";
import LoginHeader from "../header/loginHeader";

class Contactus extends Component {
  
  render() {
    return (
      <>
      {/* <Header user={this.props.user} /> */}
      <LoginHeader/>
      <div className={styles.main_content}>
        {/* <Sidebar user={user}/> */}
        
        <div className={styles.border_box}>
        <p style={{fontSize: "40px",marginTop:"15px",fontWeight: "bolder",textAlign:"center"}}>ABOUT US</p>
        <p style={{margin:"10px",fontSize:"20px"}}>
            <ul>
                <li style={{margin:"2%"}}>
            Student Portal System is used by University to manage different users of University.
            </li>
            <li style={{margin:"2%"}}>
            It Consists for 3 different types of users:
            <ul style={{margin:"1%"}}>
                <li>Admin</li>
                <li>Student</li>
                <li>Faculty</li>
            </ul>
            </li>
            <li style={{margin:"2%"}}>
                The system consists of various functionalities of which some major ones are:
                <ul style={{margin:"1%"}}>
                    <li>Management of Notices.</li>
                    <li>Management of Users.</li>
                    <li>Management of Classes.</li>
                    <li>Management of Assignments/Materials</li>
                    <li>Management of Submissions</li>
                    <li>Uploading and Downloading files</li>
                </ul>
                etc and more.
            </li>
            <li style={{margin:"2%"}}>
                This website is created as a part of submission for the course of Advanced Techonlogies (SEM 05, 2021) under the guidance of <strong>Prof. Prashant M. Jadav</strong>.
            </li>
            <li style={{margin:"2%"}}>
                This website is created by:
                <ol style={{margin:"1%"}}>
                    <strong>
                    <li style={{margin:"2%"}}>
                        Name: Aakarsh Inamdar<br/>
                        Roll No: CE056<br/>
                        Email: inamdaraakarsh@gmail.com
                    </li>
                    <li style={{margin:"2%"}}>
                        Name: Sahil Jariwala<br/>
                        Roll No: CE057<br/>
                        Email: sahiljariwala6@gmail.com
                    </li>
                    </strong>
                </ol>
            </li>
            <li style={{margin:"2%"}}>
                This website is created with technologies:
                <ul style={{margin:"1%"}}>
                    <li>
                        MongoDB
                    </li>
                    <li>
                        ExpressJs
                    </li>
                    <li>
                        ReactJs
                    </li>
                    <li>
                        NodeJs
                    </li>
                </ul>
            </li>
            </ul>
        </p>
        
        </div>
      </div>
      </>
    );
  }
}

export default withRouter(Contactus);
