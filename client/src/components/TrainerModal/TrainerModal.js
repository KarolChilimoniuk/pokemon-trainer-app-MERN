import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './TrainerModal.module.css';
import CrossImage from '../../images/cross.png';
import {addTrainer, updateData} from '../../userApi/apiHandling';

const TrainerModal = ({show, click}) => {

  const loggedUser = useState(JSON.parse(localStorage.getItem("loggedUser")));
  const [name, setName] = useState("");
  const [episode, setEpisode] = useState("");
  const dispatch = useDispatch();
  const allEpisodes = ["Pokemon Red", "Pokemon Green", "Pokemon Blue", "Pokemon Yellow", "Pokemon Gold", "Pokemon Silver", "Pokemon Cristal", "Pokemon Ruby", "Pokemon Sapphire", "Pokemon FireRed", "Pokemon LeafGreen", "Pokemon Emerald", "Pokemon Diamond", "Pokemon Pearl", "Pokemon Platinum", "Pokemon HeartGold", "Pokemon SoulSilver", "Pokemon Black", "Pokemon White", "Pokemon Black 2", "Pokemon White 2", "Pokemon X", "Pokemon Y", "Pokemon Omega Ruby", "Pokemon Alpha Sapphire", "Pokemon Sun", "Pokemon Moon", "Pokemon Let's Go, Pikachu!", "Pokemon Let's Go, Eevee!", "Pokemon Sword", "Pokemon Shield", "Pokemon Brilliant Diamond", "Pokemon Shining Pearl", "Pokemon Legend Arceus"];

  const modalStyle = show ? styles.modal__show : styles.modal__hide;

  const submitHandler = async (e) => {
      e.preventDefault();
      try {
         if(name !== "" && episode !== "") {
            await addTrainer(loggedUser[0].userId, {name: name, episode: episode, pokemons: []});
            await updateData(loggedUser[0].userId, dispatch);
         } else if (name === "" || episode === "") {
            alert(`Trainer name and game episode fields can't be empty`);
         }
      } catch(err) {
            alert(err.message);
      }
  }

  return (
     <div className={modalStyle}>
       <div className={styles.modal__container}>
          <img src={CrossImage} className={styles.image} onClick={click}/>
          <form className={styles.form} onSubmit={submitHandler}>
              <div >
                 <input className={styles.input} type='text' placeholder='Trainer name' onChange={(e) => setName(e.target.value)}/>
              </div>
              <select className={styles.select} name="city" onChange={(e)=>{console.log(e.target.value);setEpisode(e.target.value)}}>
                   <option className={styles.option} value="">Choose game episode</option>
                   {allEpisodes.map((el) => 
                    <option value={el}>{el}</option>
                    )}
              </select>
              <div className={styles.button__bontainer}>
                    <input className={styles.button} type="submit" value="Add trainer"/>
              </div>
          </form> 
       </div>
     </div> 
 )
}

export default TrainerModal