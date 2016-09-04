const initialState = {
  loggedIn: false,
  eventForm : false
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
        loggedIn: action.payload
      }
    }
    case "LOGOUT_USER" : {
      state = {
        ...state,
        loggedIn: action.payload
      }
    }
  }

  return state;
}
