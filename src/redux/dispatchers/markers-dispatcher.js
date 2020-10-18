import { store } from "../store";
import {
  setMarkersAction,
  clearMarkersAction,
  addMarkerAction,
} from "../actions";

export const setMarkers = (markers) => {
  store.dispatch(setMarkersAction(markers));
};

export const clearMarkers = () => {
  store.dispatch(clearMarkersAction());
};

export const addMarker = (marker) => {
  store.dispatch(addMarkerAction(marker));
};
