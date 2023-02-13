import axios from "axios";
import {
  loginNativeUser,
  updateUserData,
  newSession,
} from "../actions/userActions.js";

// const url = 'https://pokemontrainerapp.herokuapp.com/';
const url = "https://pokemontrainerapp.onrender.com/";
// const url = "http://localhost:7000/";

const instance = axios.create({
  baseUrl: url,
  withCredentials: true,
  credentials: "include",
});

export const newSess = async (dispatch) => {
  await instance
    .get(`${url}auth/newSession`)
    .then((res) => {
      console.log(res.data.tokenData);
      dispatch(newSession(res.data));
    })
    .catch((err) => console.error(err.message));
};

export const signIn = async (formData, setError, history, dispatch) => {
  await instance
    .post(`${url}auth/signin`, {
      password: formData.password,
      email: formData.email,
    })
    .then((res) => {
      setError(null);
      dispatch(loginNativeUser(res.data.userData));
      history.push("/");
    })
    .catch((err) => {
      setError(err.response.data.message);
      history.push("/auth/signin");
      alert(err.response.data.message);
    });
};

export const signUp = async (formData, setError, history) => {
  await instance
    .post(`${url}auth/signup`, {
      userName: formData.userName,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      email: formData.email,
    })
    .then((res) => {
      setError(null);
      history.push("/");
      alert("Registered succesfully");
    })
    .catch((err) => {
      setError(err.response.data.message);
      history.push("/auth/signup");
      alert(err.response.data.message);
    });
};

export const cookieClear = async () => {
  await instance
    .get(`${url}auth/deleteCookie`)
    .then((res) => {
      console.log("Cookie cleared");
    })
    .catch((err) => {
      console.error(err.response.data.message);
    });
};

export const addTrainer = async (userId, trainer) => {
  await instance
    .patch(`${url}loggedUser/${userId}/addTrainer`, {
      userId: userId,
      trainer: trainer,
    })
    .then((res) => {
      alert("Trainer added");
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};

export const removeTrainer = async (userId, trainerId) => {
  await instance
    .patch(`${url}loggedUser/${userId}/${trainerId}/removeTrainer`, {
      userId: userId,
      trainerId: trainerId,
    })
    .then((res) => {
      alert(res.data.message);
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};

export const addPokemon = async (userId, trainerId, pokemon) => {
  await instance
    .patch(`${url}loggedUser/${userId}/${trainerId}/${pokemon}/addPokemon`, {
      userId: userId,
      trainerId: trainerId,
      pokemon: pokemon,
    })
    .then((res) => {
      alert("Pokemon caught");
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};

export const updateData = async (userId, dispatch) => {
  await instance
    .post(`${url}loggedUser/${userId}/updateData`, {
      userId: userId,
    })
    .then((res) => {
      dispatch(updateUserData(res.data.userData));
    })
    .catch((err) => {
      console.error(err.response.data.message);
    });
};
