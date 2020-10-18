import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import markersReducer from "./markers-reducer";

export default combineReducers({
  authDetails: authReducer,
  markers: markersReducer,
});
