// auth.reducer.js
import { AuthActionTypes } from "./auth.types";

const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
