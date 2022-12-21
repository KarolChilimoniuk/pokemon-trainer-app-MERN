import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cookieClear, newSess } from "../../userApi/apiHandling.js";
import { NavLink } from "react-router-dom";
import PokemonTrainer from "../../images/pokemon-trainer.png";
import { loginNativeUser, logout } from "../../actions/userActions.js";
import styles from "./SignInUp.module.css";

const SignInUp = () => {
  const loginStatus = useSelector((state) => state.user.logged);
  const hasAccount = useSelector((state) => state.user.hasAccount);
  const userName = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();

  const [scrolled, setScroll] = useState(false);

  useEffect(() => {
    console.log(loginStatus, hasAccount);
    userName !== "" && dispatch(loginNativeUser(userName));
    setInterval(newSess(dispatch), 1000 * 60 * 40);
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
      <button onClick={() => console.log(loginStatus, userName)}>ddddd</button>
      {loginStatus === true && userName !== "" && (
        <p className={styles.paragraph}>
          <NavLink className={styles.user__link} to="/loggedUser">
            <img className={styles.image} src={PokemonTrainer} />
            {userName}
          </NavLink>
        </p>
      )}
      {hasAccount === true && loginStatus === false && (
        <NavLink className={styles.link} to="/auth/signin">
          <span>Sign In</span>
        </NavLink>
      )}
      {hasAccount === true && loginStatus === true && (
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
