const InitialState = {
  hasAccount: false,
  googleAccount: false,
  userId: "",
  userName: "",
  email: "",
  logged: false,
  trainers: [],
  cookie: false,
  error: null,
};

const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "LOGIN_NATIVE_USER_SUCCESS":
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ ...action.payloads })
      );
      return {
        ...state,
        hasAccount: true,
        userId: action.payloads.userId,
        userName: action.payloads.userName,
        email: action.payloads.email,
        logged: action.payloads.logged,
        trainers: action.payloads.trainers,
        cookie: true,
      };

    case "LOGOUT":
      localStorage.clear();
      return { ...InitialState };

    case "HAVING_ACCOUNT_HANDLER":
      return {
        ...state,
        hasAccount: !state.hasAccount,
      };

    case "UPDATE_USER_DATA":
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ ...action.payloads })
      );
      return {
        ...state,
        trainers: action.payloads.trainers,
      };

    case "NEW_SESSION":
      return {
        ...state,
        logged: action.payloads.logged,
        cookie: action.payloads.cookie,
      };

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
