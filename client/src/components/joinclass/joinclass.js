import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./joinclass.module.css";
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
                                <label>Class code: </label>
                            </div>
                            <div className={styles.col2}>
                                <input type="text" id="classcode" placeholder="Enter class code here" />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <input type="submit" value="Join class"  style={{float: "left"}}/>
                            <input type="button" value="Back" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(noticeform)