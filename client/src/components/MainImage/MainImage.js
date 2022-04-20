import React from 'react';
import styles from './MainImage.module.css';
import img from '../../images/pokemons.png';

const MainImage = () => {
    return (
        <div className={styles.mainImage__container}>
          <img src={img} className={styles.mainImage}></img>
        </div>
    );
}

export default MainImage;