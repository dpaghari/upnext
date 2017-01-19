const initialState = {
  fetched : false,
  fetching: false,
  eventList: [],
  error: null
};

// Handles actions relating to event information
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_EVENT" : {
      let newEntry = {
        id: action.payload.id,
        name: action.payload.name,
        event_date: action.payload.event_date,
        location: action.payload.location,
        details: action.payload.details,
        imgURL: action.payload.imgURL,
        host: action.payload.host
      };
      let newEventList = [];
      newEventList.push(newEntry);
      newEventList = state.eventList.concat(newEventList);
      state = {
        ...state,
        eventList: newEventList
      };
      break;
    }

    case "FETCH_EVENTS_PENDING" : {
      state = {
        ...state,
        fetching: true
      };
      break;
    }
    case "FETCH_EVENTS_FULFILLED" : {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        eventList: action.payload,
        error: null
      };
      break;
    }
    case "FETCH_EVENTS_REJECTED" : {
      state = {
        ...state,
        fetching: false,
        error: action.payload
      };
      break;
    }
    case "FETCH_EVENT_INFO_SUCCESS" : {
      state = {
        ...state,
        fetching: false,
        eventInfo: action.payload
      };
      break;
    }
    case "FETCH_EVENT_INFO_REJECTED" : {
      state = {
        ...state,
        fetching: false,
        error: action.payload
      };
      break;
    }
    case "FETCH_EVENT_COMMENTS_SUCCESS" : {
      state = {
        ...state,
        fetching: false,
        event_comments: action.payload
      };
      break;
    }
    case "FETCH_EVENT_COMMENTS_REJECTED" : {
      state = {
        ...state,
        fetching: false,
        error: action.payload
      };
      break;
    }
  }
  return state;
};
