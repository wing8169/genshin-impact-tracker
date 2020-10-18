import {
  SET_MARKERS,
  ADD_MARKER,
  CLEAR_DATA,
  SET_HOURS,
  REMOVE_MARKER,
  UPDATE_MARKER,
} from "../types";

export const setMarkersAction = (markers) => {
  return {
    type: SET_MARKERS,
    payload: {
      markers,
    },
  };
};

export const setHoursAction = (hours) => {
  return {
    type: SET_HOURS,
    payload: {
      hours,
    },
  };
};

export const clearDataAction = () => {
  return {
    type: CLEAR_DATA,
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

export const removeMarkerAction = (id) => {
  return {
    type: REMOVE_MARKER,
    payload: {
      id,
    },
  };
};

export const updateMarkerAction = (marker) => {
  return {
    type: UPDATE_MARKER,
    payload: {
      marker,
    },
  };
};
