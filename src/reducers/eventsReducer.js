const initialState = {
  fetched : false,
  fetching: false,
  events: [],
  error: null
};

// Handles actions relating to event information
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_EVENT" : {
      state = {
        ...state,
        name: action.payload
      }
    }
    case "FETCH_EVENTS_PENDING" : {
      state = {
        ...state,
        fetching: true
      }
    }
    case "FETCH_EVENTS_FULFILLED" : {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        events: action.payload
      }
    }
    case "FETCH_EVENTS_REJECTED" : {
      state = {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
  }
  return state;
};
