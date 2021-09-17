import React, { Component } from 'react'
import styles from"./sidebar.module.css";
import { withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fas);

export  class Sidebar extends Component {

    
    render() {
        return (
            <div className={styles.sidebar}>
                <nav>
                    <ul>
                        <li>
                        <FontAwesomeIcon icon={['fas', 'home']}  className={styles.icon}/>
                            <a href='/'>HOME</a>
                        </li><hr />
                        <li><FontAwesomeIcon icon={['fas', 'poll']}  className={styles.icon}/><a href='/result'>RESULTS</a></li><hr/>
                        <li><FontAwesomeIcon icon={['fas', 'money-check-alt']}  className={styles.icon}/><a href='#'>FEES</a></li><hr/>
                        <li><FontAwesomeIcon icon={['fas', 'book']}  className={styles.icon}/><a href='/mysubject'>MY SUBJECTS</a></li><hr/>
                        <li><FontAwesomeIcon icon={['fas', 'id-card']}  className={styles.icon}/><a href='#'>CONTACT US</a></li><hr/>
                        <li><FontAwesomeIcon icon={['fas', 'sign-out-alt']}  className={styles.icon}/><a href='#'>LOG OUT</a></li><hr/>
                    </ul>
                </nav>    
            </div>
        )
    }
}

export default withRouter(Sidebar);