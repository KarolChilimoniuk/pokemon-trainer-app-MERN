import React from "react";
import PokeListElement from "../PokeListElement/PokeListElement";
import styles from "./TrainerPokeList.module.css";

const TrainerPokeList = ({ trainer }) => {
  return (
    <>
      {trainer.pokemons.length > 0 && (
        <section className={styles.trainer__pokemons}>
          {trainer.pokemons.map((el) => (
            <PokeListElement
              monster={el}
              inAddPokeComponent={false}
              inTrainerComponent={true}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default TrainerPokeList;
