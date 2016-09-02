import { combineReducers } from "redux";
import users from "./usersReducer";
import events from "./eventsReducer";

export default combineReducers({
   users,
   events
});
