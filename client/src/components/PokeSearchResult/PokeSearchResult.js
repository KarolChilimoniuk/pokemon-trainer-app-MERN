import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PokeListElement from "../PokeListElement/PokeListElement";
import styles from "./PokeSearchResult.module.css";

const PokeSearchResult = ({ textToSearch }) => {
  const pokemons = useSelector((state) => state.monsters.pokemonList);

  const [monsterToDisplay, newMonsterToDisplay] = useState("");

  useEffect(() => {
    const monster = pokemons.filter(
      (el) => el.name.toLowerCase() === textToSearch
    );
    monster.length > 0
      ? newMonsterToDisplay(monster[0])
      : newMonsterToDisplay("");
  }, [textToSearch]);

  return (
    <section className={styles.result__container}>
      {monsterToDisplay !== "" ? (
        <PokeListElement
          monster={monsterToDisplay}
          inAddPokeComponent={true}
          inTrainerComponent={false}
        />
      ) : null}
    </section>
  );
};

export default PokeSearchResult;
