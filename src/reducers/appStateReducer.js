const initialState = {
  loggedIn: true,
  eventForm : false,
  currentPage : "home"
};


export default function reducer (state = initialState, action) {
  switch(action.type) {
    case "TOGGLE_EVENT_FORM" : {
      state = {
        ...state,
        eventForm: action.payload
      };
      break;
    }

    case "AUTH_SUCCESS" : {
      state = {
        ...state,
        loggedIn: true
      };
      break;
    }
    case "LOGOUT_USER" : {
      state = {
        ...state,
        loggedIn: action.payload
      };
      break;
    }
    case "CHANGE_PAGE" : {
      state = {
        ...state,
        currentPage: action.payload
      };
      break;
    }
  }

  return state;
}
