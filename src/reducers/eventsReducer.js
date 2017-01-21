const initialState = {
  fetched : false,
  fetching: false,
  eventList: [],
  commentList: [],
  error: null
};

// Handles actions relating to event information
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_EVENT" : {
      let newEntry = {
        id: action.payload.event_id,
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
    case "CREATE_COMMENT" : {

      let newEntry = {
        comment_id: action.payload.comment_id,
        event_id: action.payload.event_id,
        user_id: action.payload.user_id,
        comment: action.payload.comment,
        profile_picture: action.payload.profile_picture

      };
      let newCommentsList = [];
      newCommentsList.push(newEntry);
      if(state.event_comments)
      newCommentsList = state.event_comments.comments.concat(newCommentsList);

      state = {
        ...state,
        event_comments : {
          comments: newCommentsList
        },
        new_comment_id: action.payload
      }
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
