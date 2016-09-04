const initialState = {
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
  }

  return state;
}
