import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./edituserdetails.module.css";
import Sidebar from "../sidebar/sidebar";
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

class edituserdetails extends Component {
    constructor(props) {
        super(props)
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value,
            username: "Aakarsh Inamdar"
        });
    };

    updatedetails = (e) => {
        // console.log(this.state)
        const { history } = this.props;
        console.log(history);
        e.preventDefault();
        // console.log(this.state.userid)
        try {
            axios({
                method: 'POST',
                data: this.state,
                url: '/user/update'
            }).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.error, {
                        position: "top-center",
                        theme: "colored",
                    });
                } else {
                    toast.success(res.data.success, {
                        position: "top-center",
                        theme: "colored",
                    });
                    history.push('/userdetails');
                }
            })
        } catch (error) {
            toast.error(error.message, {
                position: "top-center",
                theme: "colored",
            });
        }

    }



    render() {
        return (
            <div className={styles.main_content}>
                <Sidebar />

                <div className={styles.border_box}>
                    <form>
                        <div className={styles.row}>
                            <div className={styles.col1}>
                                <label>Full Name: </label>
                            </div>
                            <div className={styles.col2}>
                                <input name="name" type="text" id="name" placeholder=" New correct name here" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col1}>
                                <label>Contact: </label>
                            </div>
                            <div className={styles.col2}>
                                <input name="contact_no" type="number" id="contact_no" placeholder="Enter new contact number here" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col1}>
                                <label>Email: </label>
                            </div>
                            <div className={styles.col2}>
                                <input name="email" type="email" id="email" placeholder="Enter new email address here" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <input type="submit" value="Submit" onClick={this.updatedetails} />
                            <input type="button" value="Cancel" />
                        </div>

                    </form>
                </div>

            </div>
        )
    }
}

export default withRouter(edituserdetails)