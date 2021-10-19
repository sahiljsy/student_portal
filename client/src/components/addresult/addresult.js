import React, { Component } from "react";
import styles from "./addresult.module.css";
import { withRouter } from "react-router-dom";
import { Sidebar } from "../sidebar/sidebar";
import Header from "../header/header";
import Accesssdenied from "../accessdenied/accessdenied";

export class Addresult extends Component {
  componentDidMount(){
    document.body.style.backgroundImage = "url('')";
  }
  render() {
    if(localStorage.getItem("role") === "student"){
      return <Accesssdenied />
    }
    return (
      <>
      <Header user={this.props.user} />
      
      <div className={styles.main_content}>
        <Sidebar user={this.props.user}/>
        <p style={{fontSize: "40px",margin:"8px",fontWeight: "bolder"}}>ADD RESULT</p>

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
      </>
    );
  }
}

export default withRouter(Addresult);
