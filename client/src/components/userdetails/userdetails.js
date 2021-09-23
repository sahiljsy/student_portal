import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./userdetails.module.css";
import stud from '../../img/stud.jpg';
import Sidebar from "../sidebar/sidebar";
import edit from '../../img/edit.png'

class userdetails extends Component {
    render() {
        const {user} = this.props.user
        return (
            <div className={styles.main_content}>
                <Sidebar />
                <div className={styles.border_box}>
                    <div className={styles.profilephoto}>
                        <img src={stud} className={styles.profpic} />
                    </div>
                    <div className={styles.data}>
                        <div className={styles.degree}>B.Tech Computer Engg.</div><br /><br />
                        <div className={styles.display_data}>FULL NAME: </div>{user.name} &nbsp; &nbsp; <a href='#.html' className={styles.editit}><img src={edit} className={styles.edit} /></a><hr className={styles.after_data} />
                        <div className={styles.display_data}>Date of birth: </div> 01/11/2001 <hr className={styles.after_data} />
                        <div className={styles.display_data}>gender: </div> male <hr className={styles.after_data} />
                        <div className={styles.display_data}>address: </div> xyz society, abc park, pqr &nbsp; &nbsp; <a href='#.html' className={styles.editit}><img src={edit} className={styles.edit} /></a> <hr className={styles.after_data} />
                        <div className={styles.display_data}>contact: </div> 9876543210 &nbsp; &nbsp; <a href='#.html' className={styles.editit}><img src={edit} className={styles.edit} /></a> <hr className={styles.after_data} />
                        <div className={styles.display_data}>email-address: </div> {user.email} &nbsp; &nbsp; <a href='#.html' className={styles.editit}><img src={edit} className={styles.edit} /></a> <hr className={styles.after_data} />
                        <div className={styles.display_data}>Year of admission: </div> 2017 <hr className={styles.after_data} />
                        <div className={styles.display_data}>Merit rank: </div> 782 <hr className={styles.after_data} />
                        <div className={styles.display_data}>Mode of admission: </div> GIA <hr className={styles.after_data} />
                    </div>
                </div>
            </div>

        )

    }
}

export default withRouter(userdetails)