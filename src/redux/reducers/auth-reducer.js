import { SET_AUTH_DETAILS, SET_AUTH_TOKEN, CLEAR_AUTH_DETAILS } from "../types";

const initialState = {
  accessToken: null,
  refreshToken: null,
  displayName: "",
  id: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_DETAILS:
      return action.payload;
    case SET_AUTH_TOKEN:
      return { ...state, accessToken: action.payload.accessToken };
    case CLEAR_AUTH_DETAILS:
      return initialState;
    default:
      return state;
  }
};
