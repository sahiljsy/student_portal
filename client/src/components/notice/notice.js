import React, { Component } from 'react'
import styles from"./notice.module.css";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fas);

export class Notice extends Component {
    render() {
        return (
            <div id="notice-container" className={styles.notice_container}>
                    <div className={styles.notice_card}>
                        <div className={`${styles.add_notice} ${styles.text_center}`}>
                            <a href="result.html">
                            <FontAwesomeIcon icon={['fas', 'plus']} className={styles.add_notice} />
                            </a>
                        </div>
                    </div>
                    <div className={styles.notice_card}>
                        <div className={`${styles.notice_header} ${styles.text_center}`}>
                            NOTICE
                        </div>
                        <div className={styles.notice}>
                            A paragraph is a series of sentences that are organized and coherent, 
                            and are all related to a single topic. 
                            The main rule is: One paragraph = one new point in your argument. 
                            Each paragraph typically contains a three-part structure: 1.
                        </div>
                        
                    </div>
                    
                    <div className={styles.notice_card}>
                       
                    </div>
                    <div className={styles.notice_card}>
                       
                    </div>
                    <div className={styles.notice_card}>
                       
                    </div>
                    <div className={styles.notice_card}>
                       
                    </div>
                    
                </div>
        )
    }
}

export default withRouter(Notice);