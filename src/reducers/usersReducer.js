const initialState = {
  users : [],
  current_user_id : null,
  fetchedUsers: false,
  fetching: false
};



// Handles actions relating to user information
export default function usersReducer(state = initialState, action) {
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
    case "FETCH_USERS_FULFILLED": {
      ;
      state = {
        ...state,
        users: action.payload
      };
      break;
    }
    case "FETCH_USERS_REJECTED": {
      state = {
        ...state,
        error: action.payload
      };
      break;
    }

  }
  return state;
};
