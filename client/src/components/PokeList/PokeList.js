import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import ReactPaginate from 'react-paginate';
import PokemonForm from '../PokemonForm/PokemonForm';
import PokeListElement from '../PokeListElement/PokeListElement.js';
import styles from './PokeList.module.css';

const PokeList = () => {

    const compareFunction = (a,b) => {
        return a.id-b.id;
    }

    const pokemons = useSelector((state) => state.monsters.pokemonList);
    const pokemonsToShow = useSelector((state) => state.monsters.filteredPokemons).sort(compareFunction);

    const [pageNumber, setPageNumber] = useState(0);
    const monstersPerPage = 40;
    const monstersVisited = pageNumber * monstersPerPage;
    const displayMonsters = pokemonsToShow.slice(monstersVisited, monstersVisited + monstersPerPage).map(el => 
        <PokeListElement monster={el} inAddPokeComponent={false} inTrainerComponent={false}/>
    );

    const pageCount = Math.ceil(pokemonsToShow.length / monstersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    return (
        <div className={styles.pokemons__list}>
            <PokemonForm/>
            {displayMonsters}
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={styles.pagination__container}
              pageClassName={styles.pagination__page}
              pageLinkClassName={styles.pagination__link}
              previousClassName={styles.pagination__previous}
              nextClassName={styles.pagination__next}
              activeClassName={styles.active__page}
              activeLinkClassName={styles.active__link}
            />
        </div>
    );
}

export default PokeList;