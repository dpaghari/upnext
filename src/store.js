import { applyMiddleware, createStore } from "redux";

// Middleware

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware"


const middleware = applyMiddleware(promise(), thunk, logger());
// const middleware = applyMiddleware(promise(), thunk);

import reducer from "./reducers";

// const preloadedState = window.__PRELOADED_STATE__
// var currentReducer = preloadedState || reducer;
export default createStore(reducer, middleware);





// const reducers = combineReducers({
//   user: userReducer,
//   events: eventsReducer
// });


// store.subscribe(()=> {
//   console.log("store changed", store.getState());
// });


//thunk
// store.dispatch(
// {
//   type: "FETCH_EVENTS",
//   payload: axios.get("http://rest.learncode.academy/api/wstern/users")
// }
//   // axios.get("http://rest.learncode.academy/api/wstern/users")
//   //      .then((response) => dispatch({type: "RECEIVED_EVENTS", payload: response.data}));
//   //      .catch((error)=> dispatch(type: "ERROR_FETCH_EVENTS", payload: error));
// );


// Call actions for stores
// store.dispatch({
//   type: "CHANGE_NAME",
//   payload: "Dan"
// });
// store.dispatch({
//   type: "CHANGE_AGE",
//   payload: 25
// });
