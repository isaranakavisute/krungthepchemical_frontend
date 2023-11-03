// auth.actions.js
import { AuthActionTypes } from "./auth.types";

export const login = (user) => ({
  type: AuthActionTypes.LOGIN,
  payload: user,
});

export const logout = () => ({
  type: AuthActionTypes.LOGOUT,
});

