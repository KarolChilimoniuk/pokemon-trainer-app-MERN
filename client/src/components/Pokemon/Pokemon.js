import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Pokemon.module.css';

const Pokemon = () => {

    const pokemon = useSelector((state) => state.monsters.pokemonToDisplay);

    return (
        <div className={styles.pokemon__container}>
            <h3 className={styles.pokemon__header}>{pokemon.name} <span className={styles.span__id}>#{pokemon.id}</span> </h3>
            <div className={styles.images}>
                <img src={pokemon.sprites.front_default} className={styles.image}/>
                <img src={pokemon.sprites.back_default} className={styles.image}/>
            </div>
            <div className={styles.types}>
               {pokemon.types.map(types => {
               return (<p className={styles.type}>{types.type.name}</p>)
               })}
            </div>
            <div className={styles.abilities__container}>
                <h3 className={styles.abilities__header}>Abilities:</h3>
                {pokemon.abilities.map(ability => 
                    {return (<p className={styles.ability__paragraph}>{ability.ability.name}</p>)}
                )}
            </div>
            <div className={styles.stats__container}>
                <h3 className={styles.stats__header}>Stats:</h3>
                {pokemon.stats.map(el => 
                    <p className={styles.stats__paragraph}>{el.stat.name}: <span className={styles.span__stat}>{el.base_stat}</span></p>)
                }
                <p className={styles.stats__paragraph}>weight: <span className={styles.span__stat}>{pokemon.weight}</span></p>
            </div>
        </div>
    );
}

export default Pokemon;