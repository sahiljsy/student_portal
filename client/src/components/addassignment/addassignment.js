import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from 'query-string';
import styles from "./addassignment.module.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";

class addassignment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'unknown',
            title: '',
            description: '',
            user: this.props.user.id,
            attchment: null,
            dueDate: null,
            points: 0,
            isFile: true
        }
    }

    componentDidMount() {
        this.handleQueryString();
    }


    handleQueryString = () => {
        let queries = queryString.parse(this.props.location.search)

        this.setState(queries)
    }

    FileUpload(ev) {
        this.setState({ attchment: ev.target.files[0] })
    }

    save(e) {
        e.preventDefault();
        const { history } = this.props;
        const { title, user, attchment, type, dueDate } = this.state;
        var fd = new FormData();

        fd.append("type", this.state.type);
        fd.append("title", this.state.title);
        fd.append("description", this.state.description);
        fd.append("user", this.state.user);
        fd.append("attchment", this.state.attchment);
        fd.append("dueDate", this.state.dueDate);
        fd.append("points", this.state.points);
        console.log(dueDate);
        if (user) {
            if (title) {
                
                if (type == "assignment" && !dueDate) {
                    toast.error("Please select due date for your assignment.", {
                        position: "top-center",
                        theme: "colored",
                    });
                }
                if (type == "material" && attchment == null) {
                    toast.error("Please select a file to upload.", {
                        position: "top-center",
                        theme: "colored",
                    });
                }
                else {
                    axios("http://localhost:5000/assignment/create", {
                        method: 'POST',
                        data: fd,
                    }).then((res) => {
                        if (res.data.error) {

                            toast.error(res.data.error, {
                                position: "top-center",
                                theme: "colored",
                            });
                        }
                        else {
                            toast.success(res.data.success, {
                                position: "top-center",
                                theme: "colored",
                            });
                            history.goBack('/mysubject');
                        }
                    })
                }

            } else {
                toast.error("Title is required", {
                    position: "top-center",
                    theme: "colored",
                });
            }
        }
        else {
            toast.error("You cannot Post in class", {
                position: "top-center",
                theme: "colored",
            });
        }

    }

    handlechange = (e) => {
        // const { name, value } = e.target.title;
        // console.log(e.target.name);
        this.setState({

            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render() {
        let type = this.state.type

        let displayOnAssignment = () => {
            if (type == 'assignment') {
                return (
                    <div className={styles.parameters}>
                        <i className="fas fa-calendar-day" id="icon"></i><label>Due date: </label>
                        <input type="date" name="dueDate" id="dueDate" value={this.state.dueDate} onChange={this.handlechange} /><br /><br />
                        <i className="fas fa-award" id="icon"></i><label>Points: </label>
                        <input type="number" name="points" value={this.state.points} onChange={this.handlechange} />
                    </div>
                )
            }
        }

        let displaytitle = () => {
            if (type == 'assignment') {
                return <h1><i className="far fa-file-alt"></i> &nbsp; ASSIGNMENT</h1>
            }
            else {
                return <h1><i className="far fa-file-alt"></i> &nbsp; Material</h1>
            }
        }
        return (
            <>
                <form encType="multipart/form-data"><br />
                    {displaytitle()}
                    <a href="/mysubject"><input type="button" value="Cancel" /></a>
                    <input type="submit" value="Assign" onClick={this.save.bind(this)} /><br />
                    <hr className={styles.hrtag} />
                    <div className={styles.content}>
                        <div className={styles.data}>

                            <div className={styles.row}>
                                <div className={styles.col_25}>
                                    <i className="fas fa-tasks" id="icon"></i><label> Title:</label>
                                </div>
                                <div className={styles.col_75}>
                                    <input type="text" name="title" placeholder="Title" id="title" value={this.state.title} onChange={this.handlechange} />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.col_25}>
                                    <i className="far fa-calendar-minus" id="icon"></i><label> Description:</label>
                                </div>
                                <div className={styles.col_75}>
                                    <textarea name="description" placeholder="Description" id="Description" value={this.state.description} onChange={this.handlechange}></textarea>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col_25}>
                                    <i className="fas fa-file-alt" id="icon"></i><label> File to add:</label>
                                </div>
                                <div className={styles.col_75}>
                                    <input type="file" onChange={this.FileUpload.bind(this)} />
                                </div>
                            </div>
                        </div>
                        {displayOnAssignment()}
                    </div>
                </form>
            </>

        )
    }
}

export default withRouter(addassignment)