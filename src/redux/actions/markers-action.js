import { SET_MARKERS, ADD_MARKER, CLEAR_MARKERS } from "../types";

export const setMarkersAction = (markers) => {
  return {
    type: SET_MARKERS,
    payload: {
      markers,
    },
  };
};

export const clearMarkersAction = () => {
  return {
    type: CLEAR_MARKERS,
  };
};

export const addMarkerAction = (marker) => {
  return {
    type: ADD_MARKER,
    payload: {
      marker,
    },
  };
};
