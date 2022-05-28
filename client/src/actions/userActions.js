export const loginGoogleUser = (userData) => {
  return {
    type: "LOGIN_GOOGLE_USER",
    payloads: userData,
  };
};

export const loginNativeUserSuccess = (userData) => {
  return {
    type: "LOGIN_NATIVE_USER_SUCCESS",
    payloads: userData,
  };
};

export const loginNativeUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(loginNativeUserSuccess(userData));
    } catch (err) {
      console.log(err);
    }
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const updateUserData = (userData) => {
  return {
    type: "UPDATE_USER_DATA",
    payloads: userData,
  };
};

export const havingAccount = () => {
  return {
    type: "HAVING_ACCOUNT_HANDLER",
  };
};

export const newSession = (data) => {
  return {
    type: "NEW_SESSION",
    payloads: data,
  };
};
