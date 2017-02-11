const initialState = {
  users : [],
  current_user : {
    username: "Daniel",
    user_id: 2,
    profile_url: "daniel_pagharion",
    profile_picture: "https://scontent.fsan1-1.fna.fbcdn.net/v/t31.0-8/14570662_10209105801136984_1521234224787965846_o.jpg?oh=e417ffc004a3441e64e969c99476e1a3&oe=58B138BA"
  },
  fetchedUsers: false,
  fetching: false,
  fetchedUserInfo: false,
  friendsInfo: []
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
      };
      break;
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
      };
      break;
    }
    case "FETCH_USERINFO_REJECTED" : {
      state = {
        ...state,
        fetchedUserInfo: false,
        error : action.payload
      };
      break;
    }
    case "FETCH_FRIENDSINFO_FULFILLED" : {
      state = {
        ...state,
        fetchedFriendsInfo: true,
        friendsInfo : action.payload
      };
      break;
    }
    case "FETCH_FRIENDSINFO_REJECTED" : {
      state = {
        ...state,
        fetchedFriendsInfo: false,
        error : action.payload
      };
      break;
    }
    case "GET_USER_EVENT_INVITES_FULFILLED" : {
      state = {
        ...state,
        invitesInfo: action.payload
      };
      break;
    }
    case "GET_USER_EVENT_INVITES_REJECTED" : {
      state = {
        ...state,
        error : action.payload
      };
      break;
    }

  }
  return state;
};
