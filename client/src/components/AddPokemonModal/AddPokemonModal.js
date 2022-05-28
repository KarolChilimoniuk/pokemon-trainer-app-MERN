import React, { useState } from "react";
import PokeSearchResult from "../PokeSearchResult/PokeSearchResult";
import CrossImage from "../../images/cross.png";
import styles from "./AddPokemonModal.module.css";

const AddPokemonModal = ({ showModalState, showModalHandler }) => {
  //    const [showHandler, newShowHandler] = useState(show);
  //    const [modalStyles, newModalStyle] = useState(show ? styles.addPokemonModal__visible : styles.addPokemonModal__hidden);

  const [inputText, newInputText] = useState("");
  const [pokemonName, newPokemonName] = useState("");

  const showModal = showModalState;
  const modalStyles = showModal
    ? styles.addPokemonModal__visible
    : styles.addPokemonModal__hidden;

  const textHandler = (e) => {
    newInputText(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    newPokemonName(inputText.toLowerCase());
  };

  return (
    <section className={modalStyles}>
      <form className={styles.addPokemonModal__form} onSubmit={submitHandler}>
        <img
          className={styles.addPokemonModal__img}
          src={CrossImage}
          onClick={() => showModalHandler(!showModal)}
        />
        <div className={styles.addPokemonModal__inputContainer}>
          <label>Search Pokemon: </label>
          <input
            className={styles.addPokemonModal__textInput}
            type="text"
            placeholder="Write Pokemon name"
            onChange={textHandler}
          />
        </div>
        <input
          className={styles.addPokemonModal__submitInput}
          type="submit"
          value="Search Pokemon!"
        />
        <PokeSearchResult textToSearch={pokemonName} />
      </form>
    </section>
  );
};

export default AddPokemonModal;
