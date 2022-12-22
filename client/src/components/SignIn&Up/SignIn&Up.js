import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cookieClear, newSess } from "../../userApi/apiHandling.js";
import { NavLink } from "react-router-dom";
import PokemonTrainer from "../../images/pokemon-trainer.png";
import { loginNativeUser, logout } from "../../actions/userActions.js";
import styles from "./SignInUp.module.css";

const SignInUp = () => {
  const userData = useSelector((state) => state.user);
  const loginStatus = useSelector((state) => state.user.logged);
  const hasAccount = useSelector((state) => state.user.hasAccount);
  const userName = useSelector((state) => state.user.userName);
  const cookieStatus = useSelector((state) => state.user.cookie);
  const dispatch = useDispatch();

  const [loggedUser, setLoggedUser] = useState(null);
  const [scrolled, setScroll] = useState(false);

  useEffect(async () => {
    console.log(loginStatus, hasAccount);
    await newSess(dispatch);
    if (cookieStatus) {
      const storage = localStorage.getItem("loggedUser");
      setLoggedUser(JSON.parse(storage));
      dispatch(loginNativeUser(loggedUser));
    }
    window.addEventListener("scroll", () => {
      window.scrollY >= 20 ? setScroll(true) : setScroll(false);
    });
  }, []);

  const logoutHandler = () => {
    cookieClear();
    dispatch(logout());
  };

  return (
    <div
      className={scrolled ? styles.scrolled__container : styles.link__container}
    >
      {loginStatus === true && cookieStatus === true && (
        <p className={styles.paragraph}>
          <NavLink className={styles.user__link} to="/loggedUser">
            <img className={styles.image} src={PokemonTrainer} />
            {userName}
          </NavLink>
        </p>
      )}
      <button onClick={() => console.log(userData)}>click</button>
      {hasAccount === true && loginStatus === false && (
        <NavLink className={styles.link} to="/auth/signin">
          <span>Sign In</span>
        </NavLink>
      )}
      {loginStatus === true && cookieStatus === true && (
        <NavLink className={styles.link} onClick={logoutHandler} to="/">
          <span>Logout</span>
        </NavLink>
      )}
      {hasAccount === false && loginStatus === false && (
        <NavLink className={styles.link} to="/auth/signup">
          <span>Sign up</span>
        </NavLink>
      )}
    </div>
  );
};

export default SignInUp;
