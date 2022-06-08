import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { NavLink, useHistory } from "react-router-dom";
import { havingAccount } from "../../actions/userActions.js";
import { signInByGoogle, signIn, signUp } from "../../userApi/apiHandling.js";
import googleIcon from "../../images/googleIcon.png";
import styles from "./RegisterAndLogin.module.css";

const RegisterAndLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const hasAccount = useSelector((state) => state.user.hasAccount);
  const initialFormState = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    try {
      signUp(formData, setError, history);
    } catch (err) {
      console.log(err.message);
    }
  };

  const signInHandler = (e) => {
    e.preventDefault();
    try {
      signIn(formData, setError, history, dispatch);
    } catch (err) {
      console.log(err.message);
    }
  };

  const controlButtonHandler = () => {
    dispatch(havingAccount());
    setFormData(initialFormState);
    setError(null);
  };

  const googleResponseSuccess = async (res) => {
    const profileData = res?.profileObj;
    const userData = { ...profileData };
    try {
      signInByGoogle(userData, setError, history, dispatch);
    } catch (err) {
      console.log(err.message);
    }
  };

  const googleResponseFailure = (err) => {
    console.log(`Google authorization failed :(`);
    console.log(err.message);
  };

  return (
    <div className={styles.register__container}>
      <h3 className={styles.header}>
        {hasAccount ? `Log In` : `Register new user`}
      </h3>
      <h4
        className={error !== null ? styles.error__header : styles.error__null}
      >
        {error !== null && error}
      </h4>
      {hasAccount ? (
        <form styles={styles.register__form} onSubmit={signInHandler}>
          <div className={styles.input__container}>
            {/* <label className={styles.label}>Username</label> */}
            <input
              className={styles.input}
              onChange={changeHandler}
              type="email"
              name="email"
              value={formData.email}
              placeholder="E-mail"
            />
          </div>
          <div className={styles.input__container}>
            {/* <label className={styles.label}>Password</label> */}
            <input
              className={styles.input}
              onChange={changeHandler}
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
            />
          </div>
          <div className={styles.submit__container}>
            <input
              className={styles.submit}
              onChange={changeHandler}
              type="submit"
              value="Login"
            />
          </div>
          <GoogleLogin
            render={(renderProps) => (
              <div className={styles.google__container}>
                <img src={googleIcon} className={styles.google__image} />
                <button
                  onClick={renderProps.onClick}
                  className={styles.google__button}
                >
                  Sign in by Google
                </button>
              </div>
            )}
            clientId="468618443782-ncpt0so89698t45tmg0511vs8olpfkn6.apps.googleusercontent.com"
            onSuccess={googleResponseSuccess}
            onFailure={googleResponseFailure}
            cookiePolicy={"single_host_origin"}
          />
        </form>
      ) : (
        <form styles={styles.form} onSubmit={signUpHandler}>
          <div className={styles.input__container}>
            <input
              className={styles.input}
              onChange={changeHandler}
              type="E-mail"
              name="email"
              value={formData.email}
              placeholder="E-mail"
            />
          </div>
          <div className={styles.input__container}>
            <input
              className={styles.input}
              onChange={changeHandler}
              type="text"
              name="userName"
              value={formData.userName}
              placeholder="Username"
            />
          </div>
          <div className={styles.input__container}>
            <input
              className={styles.input}
              onChange={changeHandler}
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
            />
          </div>
          <div className={styles.input__container}>
            <input
              className={styles.input}
              onChange={changeHandler}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
            />
          </div>
          <div className={styles.submit__container}>
            <input className={styles.submit} type="submit" value="Register" />
          </div>
        </form>
      )}
      <NavLink to={`/auth/${hasAccount ? "signup" : "signin"}`}>
        <div className={styles.control__container}>
          <button className={styles.button} onClick={controlButtonHandler}>
            {hasAccount
              ? `Don't you have an account? Sign Up!`
              : `Do you have an account? Sign In!`}
          </button>
        </div>
      </NavLink>
    </div>
  );
};

export default RegisterAndLogin;
