import {
  ADD_ALERT,
  DELETE_ALERT,
  SET_DARK_MODE,
  LOGIN,
  LOGOUT,
  SET_ROOMS,
  SET_SIGNING_IN,
  SET_USERS,
} from "./actionTypes";

// Global Actions
export const setSigningIn = (payload) => ({
  type: SET_SIGNING_IN,
  payload,
});

export const addAlert = (payload) => ({
  type: ADD_ALERT,
  payload,
});

export const deleteAlert = (payload) => ({
  type: DELETE_ALERT,
  payload,
});

export const setDarkMode = (payload) => ({
  type: SET_DARK_MODE,
  payload,
});

// User Actions
export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
  payload: {},
});

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
});

// ChatRoom Actions
export const setRooms = (payload) => ({
  type: SET_ROOMS,
  payload,
});
