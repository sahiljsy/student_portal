import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./userdetails.module.css";
import stud from "../../img/stud.jpg";
import Sidebar from "../sidebar/sidebar";
import edit from "../../img/edit.png";
import Header from "../header/header";

class userdetails extends Component {
    render() {
        const { user } = this.props;
        console.log(user);
        return (
            <>
                <Header user={this.props.user} />
                <div className={styles.main_content}>
                    <Sidebar user={user} />
                    <div className={styles.border_box}>
                        <a
                            href="/edituserdetails"
                            className={styles.editit}
                            style={{ float: "right", margin: "20px 20px 0px 0px" }}
                        >
                            <img src={edit} alt="TO" className={styles.edit} style={{ margin: "0px" }} />{" "}
                            EDIT
                        </a>
                        <div className={styles.profilephoto}>
                            <img src={stud} alt="User Profilephoto" className={styles.profpic} />
                        </div>
                        <div className={styles.data}>
                            <div className={styles.degree}>B.Tech Computer Engg.</div>
                            <br />
                            <br />
                            <div className={styles.display_data}>USERNAME: </div>
                            {user.username} &nbsp; &nbsp;
                            <hr className={styles.after_data} />
                            <div className={styles.display_data}>FULL NAME: </div>
                            {user.name} &nbsp; &nbsp; <hr className={styles.after_data} />
                            <div className={styles.display_data}>contact: </div>{" "}
                            {user.contact} &nbsp; &nbsp; <hr className={styles.after_data} />
                            <div className={styles.display_data}>email-address: </div>{" "}
                            {user.email}&nbsp; &nbsp; <hr className={styles.after_data} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
  componentDidMount(){
    document.body.style.backgroundImage = "url('')";
  }

}

export default withRouter(userdetails);
