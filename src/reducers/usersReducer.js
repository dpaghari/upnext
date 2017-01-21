const initialState = {
  users : [],
  current_user : {},
  fetchedUsers: false,
  fetching: false,
  fetchedUserInfo: false
};



// Handles actions relating to user information
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case "AUTH_SUCCESS" : {
      state = {
        ...state,
        current_user: action.payload
      };
      break;
    }

    case "CREATE_USER" : {
      state = {
        ...state,
        new_user_id: action.payload
      }
    }

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
    case "FETCH_USERS_PENDING": {
      ;
      state = {
        ...state,
        fetching: true,
        users: action.payload
      };
      break;
    }
    case "FETCH_USERS_FULFILLED": {
      ;
      state = {
        ...state,
        fetchedUsers: true,
        users: action.payload
      };
      break;
    }
    case "FETCH_USERS_REJECTED": {
      state = {
        ...state,
        fetchedUsers: false,
        error: action.payload
      };
      break;
    }

    case "FETCH_USERINFO_FULFILLED" : {
      state = {
        ...state,
        fetchedUserInfo: true,
        userInfo : action.payload
      }
    }
    case "FETCH_USERINFO_REJECTED" : {
      state = {
        ...state,
        fetchedUserInfo: false,
        error : action.payload
      }
    }

  }
  return state;
};
