// auth.selectors.js
import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.currentUser
);

export const selectIsAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);
