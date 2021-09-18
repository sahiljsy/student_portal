import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./classform.module.css";
import Sidebar from "../sidebar/sidebar";

class noticeform extends Component {
    render() {
        return (
            <div className={styles.main_content}>
                <Sidebar />
                <div className={styles.border_box}>
                    <div className={styles.row}>
                        <div className={styles.col1}>
                            <label>Class Title: </label>
                        </div>
                        <div className={styles.col2}>
                            <input type="text" id="classtitle" placeholder="Title" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.col1}>
                            <label>Subject Name:</label>
                        </div>
                        <div className={styles.col2}>
                            <input type="text" id="subject" placeholder="Enter the subject name here" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.col1}>
                            <label>Credits</label>
                        </div>
                        <div className={styles.col2}>
                            <input type="number" name="credits" value="credits"/>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <input type="submit" value="Submit" style={{ float: "left" }} />
                        <input type="button" value="Cancel" />
                        <input type="button" value="Delete" />
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(noticeform)