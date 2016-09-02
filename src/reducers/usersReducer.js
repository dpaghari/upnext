// Handles actions relating to user information
export default function usersReducer(state = {}, action) {
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
