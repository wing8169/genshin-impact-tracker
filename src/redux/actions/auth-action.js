import { SET_AUTH_DETAILS, SET_AUTH_TOKEN, CLEAR_AUTH_DETAILS } from "../types";

export const setAuthDetailsAction = (
  accessToken,
  refreshToken,
  displayName,
  id
) => {
  return {
    type: SET_AUTH_DETAILS,
    payload: {
      accessToken,
      refreshToken,
      displayName,
      id,
    },
  };
};

export const clearAuthDetailsAction = () => {
  return {
    type: CLEAR_AUTH_DETAILS,
  };
};

export const setAuthTokenAction = (accessToken) => {
  return {
    type: SET_AUTH_TOKEN,
    payload: {
      accessToken,
    },
  };
};
