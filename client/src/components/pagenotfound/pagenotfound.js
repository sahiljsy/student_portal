import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./pagenotfound.module.css";
import notfound from "../../img/monster-brave.gif";
import { Link } from "react-router-dom";

class Pagenotfound extends Component {
    render() {
        return (
            <>
                <div className={styles.image}>
                    <img src={notfound} className={styles.pic} alt=""/>
                </div>
                <div className={styles.message}>
                    ERROR 404: PAGE NOT FOUND!
                </div>
                <div className={styles.info}>
                    We are sorry but the page you requested was not found.
                </div>
                <div className={styles.info}>
                    <Link to="/">GO TO HOME</Link>
                </div>
            </>

            
        )
    }
}

export default withRouter(Pagenotfound)