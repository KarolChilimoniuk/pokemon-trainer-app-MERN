import { combineReducers } from "redux";
import pokemonReducer from "./pokemonReducer.js";
import userReducer from "./userReducer";

const rootReducer = combineReducers(
    {
        monsters: pokemonReducer,
        user: userReducer
    });

export default rootReducer;