import {
  SET_MARKERS,
  ADD_MARKER,
  CLEAR_DATA,
  SET_HOURS,
  REMOVE_MARKER,
  UPDATE_MARKER,
  ADD_ACTIVITY,
} from "../types";

export const initialState = {
  markers: [],
  hours: 0,
  activities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MARKERS:
      const markers = action.payload;
      // sort markers
      markers.sort(function (a, b) {
        if (a.recentRespawn === -1 || a.shortestRespawn === -1) return 1;
        if (b.recentRespawn === -1 || b.shortestRespawn === -1) return -1;
        return a.estimatedRespawn < b.estimatedRespawn;
      });
      return { ...state, markers: markers };
    case UPDATE_MARKER:
      const newMarkers = [];
      for (let i = 0; i < state.markers.length; i++) {
        if (action.payload.marker.id === state.markers[i].id) {
          state.markers[i] = action.payload.marker;
        }
        newMarkers.push(state.markers[i]);
      }
      // sort markers
      newMarkers.sort(function (a, b) {
        if (a.recentRespawn === -1 || a.shortestRespawn === -1) return 1;
        if (b.recentRespawn === -1 || b.shortestRespawn === -1) return -1;
        return a.estimatedRespawn < b.estimatedRespawn;
      });
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
    case ADD_ACTIVITY:
      const newActivities = state.activities;
      newActivities.unshift(action.payload.activity);
      // trim activities to record only 14 latest activities
      if (newActivities.length > 14)
        newActivities.splice(
          14 - newActivities.length,
          newActivities.length - 14
        );
      return { ...state, activities: newActivities };
    default:
      return state;
  }
};
