import React, {useState} from 'react';
import styles from './Burger.module.css';

const Burger = ({clickHandler}) => {

    const [currentState, newState] = useState(styles.defaultBurger);
    
    const burgerHandler = () => {
       clickHandler();
       if(currentState == styles.defaultBurger) {
           newState(styles.xBurger);
       } else {
           newState(styles.defaultBurger);
       }
    };

    return (
        <div className={currentState} onClick={burgerHandler}></div>
    )
    
}

export default Burger;