import { combineReducers } from "redux";
import users from "./usersReducer";
import events from "./eventsReducer";
import appState from "./appStateReducer";

export default combineReducers({
   users,
   events,
   appState
});
