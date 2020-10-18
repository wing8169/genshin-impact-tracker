import { store } from "../store";
import {
  setMarkersAction,
  clearDataAction,
  addMarkerAction,
  setHoursAction,
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
