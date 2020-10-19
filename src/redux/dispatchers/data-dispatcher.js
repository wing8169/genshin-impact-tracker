import { store } from "../store";
import {
  setMarkersAction,
  clearDataAction,
  addMarkerAction,
  setHoursAction,
  removeMarkerAction,
  updateMarkerAction,
  addActivityAction,
} from "../actions";

export const setMarkers = (markers) => {
  store.dispatch(setMarkersAction(markers));
};

export const setHours = (hours) => {
  store.dispatch(setHoursAction(hours));
};

export const clearData = () => {
  store.dispatch(clearDataAction());
};

export const addMarker = (marker) => {
  store.dispatch(addMarkerAction(marker));
};

export const removeMarker = (id) => {
  store.dispatch(removeMarkerAction(id));
};

export const updateMarker = (marker) => {
  store.dispatch(updateMarkerAction(marker));
};

export const addActivity = (activity) => {
  store.dispatch(addActivityAction(activity));
};
