import {
  SET_MARKERS,
  ADD_MARKER,
  CLEAR_DATA,
  SET_HOURS,
  REMOVE_MARKER,
  UPDATE_MARKER,
} from "../types";

const initialState = {
  markers: [],
  hours: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MARKERS:
      return { ...state, markers: action.payload };
    case UPDATE_MARKER:
      const newMarkers = [];
      for (let i = 0; i < state.markers.length; i++) {
        if (action.payload.marker.id === state.markers[i].id) {
          state.markers[i] = action.payload.marker;
        }
        newMarkers.push(state.markers[i]);
      }
      return { ...state, markers: newMarkers };
    case ADD_MARKER:
      return { ...state, markers: [...state.markers, action.payload.marker] };
    case REMOVE_MARKER:
      return {
        ...state,
        markers: state.markers.filter(
          (marker) => marker.id !== action.payload.id
        ),
      };
    case SET_HOURS:
      return { ...state, hours: action.payload.hours };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};
