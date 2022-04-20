import React, {useState} from 'react';
import styles from './Navigation.module.css';
import Burger from '../Burger/Burger.js'
import {NavLink} from 'react-router-dom';

const Nav = () => {

    const [currentMobileState, newMobileState] = useState(styles.mobile__hidden);

    const mobileNavHandler = () => {
      if(currentMobileState === styles.mobile__hidden) {
        newMobileState(styles.mobile__visible);
      } else {
        newMobileState(styles.mobile__hidden);
      }
    }
    
    return (
      <div className={styles.navigation__container}>
        <Burger clickHandler={mobileNavHandler}/>
        <nav className={styles.mobile && currentMobileState}>
          <ul className={styles.mobile__list}>
            <NavLink className={styles.mobile__link} to='/'>Home</NavLink>
            <NavLink className={styles.mobile__link} to='/pokeList'>Pokemon List</NavLink>
          </ul>
        </nav>
        <nav className={styles.desktop}>
          <ul className={styles.desktop__list}>
            <NavLink className={styles.desktop__link} to='/'><span className={styles.desktop__span}>Home</span></NavLink>
            <NavLink className={styles.desktop__link} to='/pokeList'><span className={styles.desktop__span}>Pokemon List</span></NavLink>
          </ul>
        </nav>
      </div>
    )
}

export default Nav;