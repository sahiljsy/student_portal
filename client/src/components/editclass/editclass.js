import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./editclass.module.css";
import Sidebar from "../sidebar/sidebar";
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

class editclass extends Component {
    constructor(props) {
        super(props)
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value,
            classCode: "qKfxtgU",
            user: this.props.user.id
        });
    };

    updateClass= (e) => {
        console.log(this.state)
        const { history } = this.props;
        console.log(history);
        e.preventDefault();
        // console.log(this.state.userid)
        try {
            axios({
                method: 'POST',
                data: this.state,
                url: '/subject/update'
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
                    history.push('/mysubject');
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
                                <label>Title: </label>
                            </div>
                            <div className={styles.col2}>
                                <input type="text" name="title" id="classtitle" placeholder="Title" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col1}>
                                <label>Credits: </label>
                            </div>
                            <div className={styles.col2}>
                                <input type="number" name="credit" className={styles.credit} onChange={this.handleChange} onBlur={this.formatNumber} />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <input type="submit" value="Submit" onClick={this.updateClass} />
                            <input type="button" value="Cancel" />
                        </div>

                    </form>
                </div>

            </div>
        )
    }
}

export default withRouter(editclass)