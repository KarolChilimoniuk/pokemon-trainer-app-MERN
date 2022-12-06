import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchPokemonList } from "./actions/pokemonActions.js";
import SignInUp from "./components/SignIn&Up/SignIn&Up";
import Nav from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import PokeList from "./components/PokeList/PokeList";
import Pokemon from "./components/Pokemon/Pokemon";
import RegisterAndLogin from "./components/Register/Register&Login";
import User from "./components/User/User";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
  const loading = useSelector((state) => state.monsters.isLoading);
  const monsterToShow = useSelector((state) => state.monsters.pokemonToDisplay);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, []);

  return (
    <Router>
      <div className="App">
        <SignInUp />
        <Nav />
        <Switch>
          <Route strict path={"/auth"} component={RegisterAndLogin} />
          <Route
            strict
            path={"/pokeList/" + monsterToShow.name}
            component={Pokemon}
          />
          <Route strict path="/pokeList" component={PokeList} />
          <Route strict path="/loggedUser" component={User} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
