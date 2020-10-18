import { SET_MARKERS, ADD_MARKER, CLEAR_MARKERS } from "../types";

const initialState = {
  markers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MARKERS:
      return action.payload;
    case ADD_MARKER:
      return { markers: [...state.markers, action.payload.marker] };
    case CLEAR_MARKERS:
      return initialState;
    default:
      return state;
  }
};
