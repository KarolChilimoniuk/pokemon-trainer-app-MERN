import React from 'react';
import MainImage from '../MainImage/MainImage';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.home__container}>
          <MainImage/>
        </div>
    )
}

export default Home;