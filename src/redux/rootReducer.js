import {
  SET_SIGNING_IN,
  ADD_ALERT,
  DELETE_ALERT,
  SET_DARK_MODE,
  SET_ROOMS,
  LOGIN,
  LOGOUT,
  SET_USERS,
} from "./actionTypes";

const initialState = {
  global: {
    isSigningIn: false,
    alerts: [],
    darkModeEnabled: false,
  },
  currentUser: null,
  users: [],
  chatRooms: [],
  notifications: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNING_IN:
      return {
        ...state,
        global: {
          ...state.global,
          isSigningIn: action.payload,
        },
      };
    case ADD_ALERT:
      const nextAlertId =
        state.global.alerts.reduce(
          (agg, alert) => (alert.id > agg ? alert.id : agg),
          0
        ) + 1;
      action.payload.id = nextAlertId;

      return {
        ...state,
        global: {
          ...state.global,
          alerts: [...state.global.alerts, action.payload],
        },
      };
    case DELETE_ALERT:
      return {
        ...state,
        global: {
          ...state.global,
          alerts: state.global.alerts.filter(
            (alert) => alert.id !== action.payload
          ),
        },
      };
    case SET_DARK_MODE:
      return {
        ...state,
        global: {
          ...state.global,
          darkModeEnabled: action.payload,
        },
      };
    case LOGIN:
      return {
        ...state,
        currentUser: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: {},
      };
    case SET_ROOMS:
      return {
        ...state,
        chatRooms: [...action.payload],
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
