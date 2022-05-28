import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterPokemonsByName,
  filterPokemonsByType,
} from "../../actions/pokemonActions.js";
import styles from "./PokemonForm.module.css";

const PokemonForm = () => {
  const pokemons = useSelector((state) => state.monsters.pokemonList);
  const filterValue = useSelector((state) => state.monsters.pokemonFilterValue);

  const [pokeFilterValue, newFilterValue] = useState(filterValue);

  const dispatch = useDispatch();
  const nameSubmitHandler = (value) => {
    dispatch(filterPokemonsByName(value.toLowerCase(), pokemons));
  };

  const typeSubmitHandler = (value) => {
    dispatch(filterPokemonsByType(value, pokemons));
  };

  return (
    <div className={styles.forms__container}>
      <form
        className={styles.name__form}
        onSubmit={(e) => {
          e.preventDefault();
          nameSubmitHandler(pokeFilterValue);
        }}
      >
        <div>
          <p className={styles.paragraph}>Search by name</p>
          <input
            className={styles.name__input}
            type="text"
            placeholder="Pokemon name"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
        </div>
        <div className={styles.button__container}>
          <input className={styles.button} type="submit" value="Search" />
        </div>
      </form>
      <form
        className={styles.type__form}
        onSubmit={(e) => {
          e.preventDefault();
          typeSubmitHandler(pokeFilterValue);
        }}
      >
        <p className={styles.paragraph}>Search by type</p>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="all"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>all</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="bug"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>bug</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="dark"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>dark</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="dragon"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>dragon</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="electric"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>electric</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="fairy"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>fairy</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="fighting"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>fighting</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="fire"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>fire</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="flying"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>flying</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="ghost"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>ghost</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="grass"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>grass</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="ground"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>ground</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="ice"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>ice</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="normal"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>poison</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="physic"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>physic</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="rock"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>rock</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="steel"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>steel</label>
        </div>
        <div className={styles.radio__container}>
          <input
            className={styles.radio__input}
            type="radio"
            name="types"
            value="water"
            onChange={(e) => {
              newFilterValue(e.target.value);
            }}
          />
          <label className={styles.radio__label}>water</label>
        </div>
        <div className={styles.button__container}>
          <input
            className={styles.button}
            id={styles.typeFilterSubmit}
            type="submit"
            value="Search"
          />
        </div>
      </form>
    </div>
  );
};

export default PokemonForm;
