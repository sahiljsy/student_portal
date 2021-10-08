import React, { Component } from "react";
import styles from "./result.module.css";
import { withRouter, Redirect } from "react-router-dom";
import { Sidebar } from "../sidebar/sidebar";
import Header from "../header/header";
export class Result extends Component {
  render() {
    if (
      this.props.user.role === "admin" ||
      this.props.user.role === "faculty"
    ) {
      return <Redirect to="addresult"></Redirect>;
      // return <Accesssdenied />;
    } else {
      return (
        <React.Fragment>
          <Header user={this.props.user} />
          <div className={styles.main_content}>
            <Sidebar user={this.props.user} />
            <div className={styles.table}>
              <h3>ID NO: 12345567</h3>
              <h3>NAME: JSY</h3>
              <h3>BATCH YEAR:2019</h3>
              <table>
                <th>SUBJECT</th>
                <th>MID-TERM</th>
                <th>PRACTICAL</th>
                <th>EXTERNAL</th>
                <th>TOTAL</th>
                <tr>
                  <td>1</td>
                  <td>2 </td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2 </td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2 </td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2 </td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2 </td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2 </td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                </tr>
              </table>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default withRouter(Result);
