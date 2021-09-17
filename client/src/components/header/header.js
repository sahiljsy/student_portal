import React, { Component } from "react";
import styles from "./header.module.css";
import Logo from "../../img/logo.png";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fas);

const Header = () => {
  return (
    <div id="header" className={styles.header}>
      <img src={Logo} id="logo" className={styles.logo}/>
      <sapn id="tag" className={styles.tag}>USERNAME</sapn> 
        <div className={styles.dropdown_menu}>
            <div className={styles.bars}>
                <FontAwesomeIcon icon={['fas', 'bars']} className={styles.bars_icon}/>
            </div>
            <div className ={`${styles.dropdown_list} ${styles.nav_menu}`}>
                <ul className = {styles.no_list_style}>
                    <li>USERNAME</li><hr/>
                    <li><a href='/'>HOME</a></li><hr/>
                    <li><a href='/result'>RESULTS</a></li><hr/>
                    <li><a href='#'>FEES</a></li><hr/>
                    <li><a href='/mysubject'>MY SUBJECTS</a></li><hr/>
                    <li><a href='#'>CONTACT US</a></li><hr/>
                    <li><a href='#'>Logout</a></li>
                </ul>
            </div>

         </div>
    </div>
  );
};

export default Header;
