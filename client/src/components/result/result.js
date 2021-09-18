import React, { Component } from "react";
import styles from "./result.module.css";
import { withRouter } from "react-router-dom";
import { Sidebar } from "../sidebar/sidebar";

export class Result extends Component {
  render() {
    return (
      <div className={styles.main_content}>
        <Sidebar />
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
    );
  }
}

export default withRouter(Result);
