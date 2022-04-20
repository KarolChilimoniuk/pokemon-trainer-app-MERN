import React, {useState, createContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TrainerPokeList from '../TrainerPokeList/TrainerPokeList';
import AddPokemonModal from '../AddPokemonModal/AddPokemonModal';
import ExpandIcon from '../../images/expand.png';
import HideIcon from '../../images/hide.png';
import {removeTrainer, updateData} from '../../userApi/apiHandling';
import styles from './UserTrainer.module.css';

export const TrainerIdContext = createContext('')

const UserTrainer = ({trainer}) => {

  const [infoClass, newInfoClass] = useState(styles.info__hidden);
  const [expandIconClass, newExpandIconClass] = useState(styles.image__visible);
  const [hideIconClass, newHideIconClass] = useState(styles.image__hidden);
  const [showModalState, newShowModalState] = useState(false);

  const userId = useSelector(state => state.user.userId)

  const dispatch = useDispatch();

  const removeHandler = async(userId, trainerId) => {
    await removeTrainer(userId, trainerId);
    await updateData(userId, dispatch);
  }

  return (
    <TrainerIdContext.Provider value={trainer.id}>
    <div className={styles.trainer__container}>
      <div className={styles.images__container}>
        <img src={ExpandIcon} className={expandIconClass} alt="Expand" onClick={() => {
          newInfoClass(styles.info);
          newExpandIconClass(expandIconClass === styles.image__hidden ? styles.image__visible : styles.image__hidden);
          newHideIconClass(hideIconClass === styles.image__hidden ? styles.image__visible : styles.image__hidden);
          }}
        />
        <img src={HideIcon} className={hideIconClass} alt="Collapse" onClick={() => {
          newInfoClass(styles.info__hidden); 
          newExpandIconClass(expandIconClass === styles.image__hidden ? styles.image__visible : styles.image__hidden);
          newHideIconClass(hideIconClass === styles.image__hidden ? styles.image__visible : styles.image__hidden);
          }}
        />
        <h3 className={styles.images__header}>{trainer.name}</h3>
      </div>
      <div className={infoClass}>
        <p className={styles.info__paragraph}><span className={styles.info__title}>Trainer name:</span> {trainer.name}</p>
        <p className={styles.info__paragraph}><span className={styles.info__title}>Game:</span> {trainer.episode}</p>
        <div className={styles.trainer__pokemons}>
          <p className={styles.info__paragraph}><span className={styles.info__title}>Caught Pokemons</span></p>
          {/* <PokeListElement/> */}
          {/* {trainer.pokemons.length > 0 && trainer.pokemons.map(el => <p>{el.name}</p>)} */}
          <TrainerPokeList trainer={trainer}/>
        </div>
        <div className={styles.buttons__container}>
          <button className={styles.button} onClick={() => removeHandler(userId, trainer.id)}>Remove Trainer</button>
          <button className={styles.button} onClick={() => newShowModalState(!showModalState)}>Catch Pokemon</button>
        </div>
      </div>
      <AddPokemonModal showModalState={showModalState} showModalHandler={newShowModalState} trainerId={trainer.id}/>
    </div>
    </TrainerIdContext.Provider>
  )
}

export default UserTrainer;