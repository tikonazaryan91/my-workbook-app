import * as actionTypes from "./types";
import database from "../../configs/firebase";

export const authSuccess = (fetchedUsers) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: fetchedUsers,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (username, password) => {
  return (dispatch) => {
    database
      .ref(`users/${username}`)
      .once("value")
      .then((snap) => {
        const data = snap.val();

        if (!data) {
          dispatch(authFail("User with this name not exist"));
        } else if (data.password !== password) {
          dispatch(authFail("Password is wrong"));
        } else {
          const user = { ...data, username: username };
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authSuccess(user));
        }
      })
      .catch((error) => {
        dispatch(authFail(error.message));
      });
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
