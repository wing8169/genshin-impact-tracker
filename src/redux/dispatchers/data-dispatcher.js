import { store } from "../store";
import {
  setMarkersAction,
  clearDataAction,
  addMarkerAction,
  setHoursAction,
  removeMarkerAction,
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
