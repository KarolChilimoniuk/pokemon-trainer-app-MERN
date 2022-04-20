const initialState = {
    pokemonList: [],
    filteredPokemons: [],
    isLoading: false,
    error: null,
    pokemonToDisplay: "none",
    pokemonFilterValue: "all",
}

const pokemonReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_POKEMONS_REQUEST':
            return {
                ...state,
                isLoading: true
            }
        case 'FETCH_POKEMON_SUCCESS':
            return {
                ...state,
                pokemonList: [...state.pokemonList, action.payloads],
                filteredPokemons: [...state.filteredPokemons, action.payloads],
                isLoading: false
            }
        case 'FETCH_POKEMONS_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.payloads
            }
        case 'CHOOSE_MONSTER_TO_DISPLAY':
            return {
                ...state,
                pokemonToDisplay: action.payloads
            }
        case 'POKEMON_FILTER_VALUE':
            return {
               ...state,
               pokemonFilterValue: action.payloads
            }
        case 'FILTER_POKEMONS':
            return {
              ...state,
              filteredPokemons: action.payloads
            }
        default:
            return state;
    }
}

export default pokemonReducer;