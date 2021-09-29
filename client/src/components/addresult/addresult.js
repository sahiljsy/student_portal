import React, { Component } from "react";
import styles from "./addresult.module.css";
import { withRouter } from "react-router-dom";
import { Sidebar } from "../sidebar/sidebar";
import Accesssdenied from "../accessdenied/accessdenied";

export class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    if (this.props.user.role === "student") {
      return <Accesssdenied />;
    }
    return (
      <div className={styles.main_content}>
        <Sidebar />

        <select name="subject" id="subject">
          <option value="MFP">MFP</option>
          <option value="WDDN">WDDN</option>
          <option value="OS">OS</option>
          <option value="AA">AA</option>
          <option value="AT">AT</option>
        </select>
        <center>
          <input
            type="button"
            value="Find Record"
            style={{ background: "orange" }}
          />
        </center>
        <div className={styles.table}>
          <form>
            <table>
              <th>Student Name</th>
              <th>MID-TERM</th>
              <th>PRACTICAL</th>
              <th>EXTERNAL</th>
              <th>TOTAL</th>
              <tr>
                <td>ABC</td>
                <td>
                  <input type="number" id="midterm" />
                </td>
                <td>
                  <input type="number" id="practical" />
                </td>
                <td>
                  <input type="number" id="external" />
                </td>
                <td>
                  <input type="number" id="total" />
                </td>
              </tr>
              <tr>
                <td>DEF</td>
                <td>
                  <input type="number" id="midterm" />
                </td>
                <td>
                  <input type="number" id="practical" />
                </td>
                <td>
                  <input type="number" id="external" />
                </td>
                <td>
                  <input type="number" id="total" />
                </td>
              </tr>
              <tr>
                <td>GHI</td>
                <td>
                  <input type="number" id="midterm" />{" "}
                </td>
                <td>
                  <input type="number" id="practical" />
                </td>
                <td>
                  <input type="number" id="external" />
                </td>
                <td>
                  <input type="number" id="total" />
                </td>
              </tr>
              <tr>
                <td>JKL</td>
                <td>
                  <input type="number" id="midterm" />
                </td>
                <td>
                  <input type="number" id="practical" />
                </td>
                <td>
                  <input type="number" id="external" />
                </td>
                <td>
                  <input type="number" id="total" />
                </td>
              </tr>
              <tr>
                <td>MNO</td>
                <td>
                  <input type="number" id="midterm" />{" "}
                </td>
                <td>
                  <input type="number" id="practical" />
                </td>
                <td>
                  <input type="number" id="external" />
                </td>
                <td>
                  <input type="number" id="total" />
                </td>
              </tr>
              <tr>
                <td>PQR</td>
                <td>
                  <input type="number" id="midterm" />{" "}
                </td>
                <td>
                  <input type="number" id="practical" />
                </td>
                <td>
                  <input type="number" id="external" />
                </td>
                <td>
                  <input type="number" id="total" />
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Result);
