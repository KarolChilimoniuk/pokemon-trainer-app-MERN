import api from "../pokeApi/apiHandling";

export const fetchPokemonsRequest = () => {
  return {
    type: "FETCH_POKEMONS_REQUEST",
  };
};

export const fetchPokemonSuccess = (monster) => {
  return {
    type: "FETCH_POKEMON_SUCCESS",
    payloads: monster,
  };
};

export const fetchPokemonsFailure = (error) => {
  return {
    type: "FETCH_POKEMONS_FAILURE",
    payloads: error,
  };
};

export const fetchPokemonList = () => {
  return (dispatch) => {
    dispatch(fetchPokemonsRequest);
    fetch(api.basicUrl + api.kindOfData + api.limit + api.offset)
      .then((resp) => resp.json())
      .then((data) => {
        const pokeList = data.results;
        pokeList.forEach((el) => {
          fetch(el.url)
            .then((response) => response.json())
            .then((pokemonDetails) => {
              dispatch(fetchPokemonSuccess(pokemonDetails));
            });
        });
      })
      .catch((err) => {
        const errMes = err.message;
        dispatch(fetchPokemonsFailure(errMes));
      });
  };
};

export const chooseMonsterToDisplay = (monster) => {
  return {
    type: "CHOOSE_MONSTER_TO_DISPLAY",
    payloads: monster,
  };
};

export const pokemonFilter = (filterValue) => {
  return {
    type: "POKEMON_FILTER_VALUE",
    payloads: filterValue,
  };
};

export const filteredPokemonsList = (pokemonsToDisplay) => {
  return {
    type: "FILTER_POKEMONS",
    payloads: pokemonsToDisplay,
  };
};

export const filterPokemonsByName = (filterValue, pokemonsList) => {
  return (dispatch) => {
    dispatch(pokemonFilter(filterValue));
    switch (filterValue) {
      case "all":
        dispatch(filteredPokemonsList(pokemonsList));
        break;
      default:
        const filteredPokemons = pokemonsList.filter(
          (el) => el.name === filterValue
        );
        dispatch(filteredPokemonsList(filteredPokemons));
        break;
    }
  };
};

export const filterPokemonsByType = (filterValue, pokemonsList) => {
  return (dispatch) => {
    dispatch(pokemonFilter(filterValue));
    switch (filterValue) {
      case "all":
        dispatch(filteredPokemonsList(pokemonsList));
        break;
      default:
        const filteredPokemons = pokemonsList.filter((el) => {
          let monster = "";
          el.types.forEach((type) => {
            if (type.type.name === filterValue) {
              monster = JSON.parse(JSON.stringify(el));
            }
          });
          if (monster !== "") {
            return monster;
          }
        });
        dispatch(filteredPokemonsList(filteredPokemons));
        break;
    }
  };
};
