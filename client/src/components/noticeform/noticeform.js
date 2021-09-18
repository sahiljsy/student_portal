import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./noticeform.module.css";
import Sidebar from "../sidebar/sidebar";

class noticeform extends Component {
    render() {
        return (
            <div className={styles.main_content}>
                <Sidebar />

                <div className={styles.border_box}>
                    <form>
                        <div className={styles.row}>
                            <div className={styles.col1}>
                                <label>Notice Title: </label>
                            </div>
                            <div className={styles.col2}>
                                <input type="text" id="noticetitle" placeholder="Title" />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col1}>
                                <label>Notice Information: </label>
                            </div>
                            <div className={styles.col2}>
                                <textarea id="subject" name="subject" placeholder="Specify the details">
                                </textarea>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col1}>
                                <label>File to upload:</label>
                            </div>
                            <div className={styles.col2}>
                                <input type="file" name="noticefile" />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <input type="submit" value="Submit" style={{ float: "left" }} />
                            <input type="button" value="Cancel" />
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default withRouter(noticeform)