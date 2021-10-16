import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./edituserdetails.module.css";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../header/header";

class edituserdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.user.email,
            name: this.props.user.name,
            username: this.props.user.username,
            contact: this.props.user.contact,
        };
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value,
        });
    };

    //<<<<<<< HEAD
    updatedetails = (e) => {
        const { name, username, contact } = this.state;
        const { history } = this.props;
        // console.log(history);
        e.preventDefault();
        // console.log(this.state.userid)
        try {
            if (!name || !username || !contact) {
                toast.error("All Fields must be provided.", {
                    position: "top-center",
                    theme: "colored",
                });
            }
            else {
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
                        //this.props.setUser(res.data.user)
                        this.props.setuser(res.data.user) 
                        toast.success(res.data.success, {
                            position: "top-center",
                            theme: "colored",
                        });
                        history.push('/userdetails');
                    }
                })
            }

        } catch (error) {
            toast.error(error.message, {
                position: "top-center",
                theme: "colored",
                // =======
                //   updatedetails = (e) => {
                //     const { name, username, contact } = this.state;
                //     const { history } = this.props;
                //     // console.log(history);
                //     e.preventDefault();
                //     // console.log(this.state.userid)
                //     try {
                //       if (!name || !username || !contact) {
                //         toast.error("All Fields must be provided.", {
                //           position: "top-center",
                //           theme: "colored",
                //         });
                //       } else {
                //         axios({
                //           method: "POST",
                //           data: this.state,
                //           url: "/user/update",
                //         }).then((res) => {
                //           if (res.data.error) {
                //             toast.error(res.data.error, {
                //               position: "top-center",
                //               theme: "colored",
                // >>>>>>> 029bd9c917f7ee9baf096433182bf5bed819e681
                //            });
                //           } else {
                //             toast.success(res.data.success, {
                //               position: "top-center",
                //               theme: "colored",
                //             });
                //             history.push("/userdetails");
                //           }
                //         });
                //       }
                //     } catch (error) {
                //       toast.error(error.message, {
                //         position: "top-center",
                //         theme: "colored",
            });
        }
    };

    render() {
        return (
            <>
                <Header user={this.props.user} />
                <div className={styles.main_content}>
                    <Sidebar user={this.props.user} />
                    <div className={styles.border_box}>
                        <form>
                            <div className={styles.row}>
                                <div className={styles.col1}>
                                    <label>Full Name: </label>
                                </div>
                                <div className={styles.col2}>
                                    <input
                                        name="name"
                                        type="text"
                                        id="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col1}>
                                    <label>Username: </label>
                                </div>
                                <div className={styles.col2}>
                                    <input
                                        name="username"
                                        type="text"
                                        id="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col1}>
                                    <label>Contact: </label>
                                </div>
                                <div className={styles.col2}>
                                    <input
                                        name="contact"
                                        type="number"
                                        id="contact"
                                        value={this.state.contact}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <input
                                    type="submit"
                                    value="Submit"
                                    onClick={this.updatedetails}
                                />
                                <a href="/userdetails">
                                    <input type="button" value="Cancel" />
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(edituserdetails);
