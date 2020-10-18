import { SET_MARKERS, ADD_MARKER, CLEAR_DATA, SET_HOURS } from "../types";

const initialState = {
  markers: [],
  hours: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MARKERS:
      return { ...state, markers: action.payload };
    case ADD_MARKER:
      return { ...state, markers: [...state.markers, action.payload.marker] };
    case SET_HOURS:
      return { ...state, hours: action.payload.hours };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};
