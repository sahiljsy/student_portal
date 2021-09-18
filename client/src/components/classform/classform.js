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
                    <form>
                        <div className={styles.row}>
                            <div className={styles.col1}>
                                <label>Title: </label>
                            </div>
                            <div className={styles.col2}>
                                <input type="text" id="classtitle" placeholder="Title" />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col1}>
                                <label>Credits:  </label>
                            </div>
                            <div className={styles.col2}>
                                <input type="number" name="credits" value="credits" className={styles.credit}/>
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