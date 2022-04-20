import React, {useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { TrainerIdContext } from '../UserTrainer/UserTrainer.js';
import {chooseMonsterToDisplay} from '../../actions/pokemonActions.js';
import { addPokemon, updateData } from "../../userApi/apiHandling";
import styles from './PokeListElement.module.css';

const PokeListElement = ({monster, inAddPokeComponent, inTrainerComponent}) => {
    
    const dispatch = useDispatch();

    const userId = useSelector((state) => state.user.userId);
    const trainerId = useContext(TrainerIdContext);

    const classStyles = inAddPokeComponent || inTrainerComponent ? styles.monster__add__container : styles.monster__container;

    const monsterToDisplayHandler = (monster) => {
        dispatch(chooseMonsterToDisplay(monster));
    }

    const addPokemonHandler = async () => {
        try {
            await addPokemon(userId, trainerId, monster);
            await updateData(userId, dispatch);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
           <NavLink className={classStyles} to={`/pokeList/${monster.name}`} onClick={() => monsterToDisplayHandler(monster)}>
              <img src={monster.sprites.front_default} className={styles.image}/>
              <p className={styles.paragraph__id}>#{monster.id}</p>
              <p className={styles.paragraph__name}>{monster.name}</p>
              <div className={styles.types}>
                  {monster.types.map(types => {
                  return (<p className={styles.type}>{types.type.name}</p>)
                  })}
              </div>
              <NavLink className={styles.link} to={`/pokeList/${monster.name}`} onClick={() => monsterToDisplayHandler(monster)}>...</NavLink>
           </NavLink>
           {inAddPokeComponent && <button className={styles.button} onClick={addPokemonHandler}>Catch!</button>}
        </>
    );
}

export default PokeListElement;