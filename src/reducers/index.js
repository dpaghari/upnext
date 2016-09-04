import { combineReducers } from "redux";
import users from "./usersReducer";
import events from "./eventsReducer";
import appState from "./appStateReducer";
import { routerReducer } from "react-router-redux";

export default combineReducers({
   users,
   events,
   appState,
   routing: routerReducer 
});
