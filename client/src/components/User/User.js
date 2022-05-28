import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import UserTrainer from '../UserTrainer/UserTrainer';
import TrainerModal from '../TrainerModal/TrainerModal';
import styles from './User.module.css';

const User = () => {
 
 const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("loggedUser")));
 const [showModal, setShowModal] = useState(false);
 const userData = useSelector((state) => state.user);
 
 const userTrainers = userData.trainers.map((el) => 
    <UserTrainer trainer={el} />
 );

 return(
   <section className={styles.user__container}>
       {loggedUser ? 
         <h3 className={styles.header}>User panel</h3> : <h3>Something wrong :/</h3>       
       }
       <p><span className={styles.span}>user-name:</span> {userData.userName}</p>
       <p><span className={styles.span}>E-mail:</span> {userData.email}</p>
       <p><span className={styles.span}>Added trainers:</span> {userData.trainers.length === 0 ? 'None' : userTrainers}</p>
       <button className={styles.button} onClick={() => setShowModal(!showModal)}>Add Trainer</button>
       <TrainerModal show={showModal} click={() => setShowModal(!showModal)}/>
   </section>
 )
}

export default User;