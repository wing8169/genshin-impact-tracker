import { store } from "../store";
import {
  setAuthDetailsAction,
  setAuthTokenAction,
  clearAuthDetailsAction,
} from "../actions";

export const setAuthDetails = (accessToken, refreshToken, displayName, id) => {
  store.dispatch(
    setAuthDetailsAction(accessToken, refreshToken, displayName, id)
  );
};

export const clearAuthDetails = () => {
  store.dispatch(clearAuthDetailsAction());
};

export const setAuthToken = (accessToken) => {
  store.dispatch(setAuthTokenAction(accessToken));
};
