import { applyMiddleware, combineReducers, createStore } from "redux";

const middleware = applyMiddleware();

// Handles actions relating to user information
const userReducer = (initState = {}, action) => {
  switch (action.type) {
    case "CHANGE_NAME": {
      state = {
        ...state,
        name: action.payload
      };
      break;
    }
    case "CHANGE_EMAIL": {
      state = {
        ...state,
        age: action.payload
      };
      break;
    }
  }
  return state;
};

// Handles actions relating to event information
const eventsReducer = (initState = [], action) => {
  switch (action.type) {
    case "CREATE_EVENT" : {
      state = {
        ...state,
        name: action.payload
      }
    }
    case "GET_ALL_EVENTS" : {
      state = {
        ...state,
        events: action.payload
      }
    }
  }
  return state;
};


const reducers = combineReducers({
  user: userReducer,
  tweets: eventsReducer
});

const store = createStore(reducers);


store.subscribe(()=> {
  console.log("store changed", store.getState());
});

// Call actions for stores
store.dispatch({
  type: "CHANGE_NAME",
  payload: "Dan"
});
store.dispatch({
  type: "CHANGE_AGE",
  payload: 25
});
