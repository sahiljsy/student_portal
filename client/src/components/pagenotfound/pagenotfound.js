import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./pagenotfound.module.css";
import notfound from "../../img/monster-brave.gif";

class pagenotfound extends Component {
    render() {
        return (
            <>
                <div className={styles.image}>
                    <img src={notfound} className={styles.pic}/>
                </div>
                <div className={styles.message}>
                    ERROR 404: PAGE NOT FOUND!
                </div>
                <div className={styles.info}>
                    We are sorry but the page you requested was not found.
                </div>
            </>

            
        )
    }
}

export default withRouter(pagenotfound)