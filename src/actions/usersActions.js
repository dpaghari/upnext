import axios from "axios";

const userEndpoint = "../../services/get.php?";
// const userEndpoint = "/mockdb/users.json";

export function authUser({username, password}) {

  return (dispatch) => {
    let data = {
      action: "auth_user",
      user_name: username,
      pw: password
    };
    axios.post(userEndpoint + "action=auth_user", data)
     .then((response) =>  {
      let result = response.data;
      let { valid, user_info } = result;
      if(valid){
       dispatch({
         type: "AUTH_SUCCESS",
         payload: user_info
       });
      }
      else {
        dispatch({
          type: "AUTH_FAILED",
          payload: valid
        });
      }
     })
     .catch((error) => {
       dispatch({
         type: "AUTH_FAILED",
         payload: error
       });
     });
  }

}

export function logOut() {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT_USER",
      payload: false
    });
  };
}


export function fetchUsers() {
  return (dispatch) => {
    axios.get(userEndpoint + "action=users")
         .then((response) =>  {
           dispatch({
             type: "FETCH_USERS_FULFILLED",
             payload : response.data
           });
         })
         .catch((error) => {
           dispatch({
             type: "FETCH_USERS_REJECTED",
             payload: error
           })
         });

  };
}
export function fetchUserInfo({userID}) {
  return (dispatch) => {
    axios.get(`${userEndpoint}action=get_user&userID=${userID}`)
         .then((response) =>  {
           dispatch({
             type: "FETCH_USERINFO_FULFILLED",
             payload : response.data
           });
         })
         .catch((error) => {
           dispatch({
             type: "FETCH_USERINFO_REJECTED",
             payload: error
           })
         });

  };
}


export function createUser({ user_name , user_pw, user_dob , user_profile_picture }) {
  return (dispatch) => {
    var data = {
      user_name,
      user_pw,
      user_dob,
      user_profile_picture
    };
    axios.post(userEndpoint + "action=create_user", data).then((response) => {

      dispatch({
        type: "CREATE_USER",
        payload: {
          user_id: response.data,
        }
      });
      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          user_id: response.data,
          username: user_name,
          profile_picture: user_profile_picture,
          profile_url: user_name
        }
      });
    })
    .catch((error)=> {
      dispatch({
        type: "CREATE_USER_REJECTED",
        payload: error
      })
    });
  };
}

export function fetchFriendsInfo(friendsID) {
  return (dispatch) => {
    axios.get(`${userEndpoint}action=get_friends_info&friendIDs=${friendsID}`)
    .then((response) => {
      dispatch({
        type: "FETCH_FRIENDSINFO_FULFILLED",
        friendsInfo: response.data
      });

    })
    .catch((error) => {
      dispatch({
        type: "FETCH_FRIENDSINFO_REJECTED",
        error
      })
    });
  };

}


export function getUserEventInvites(userID) {
  return (dispatch) => {
    let data = {
      user_id : userID
    }
    axios.post(`${userEndpoint}action=get_user_event_invites`, data)
      .then((response)=> {
        dispatch({
          type: "GET_USER_EVENT_INVITES_FULFILLED",
          payload: response.data
        });
      })
      .catch((error)=> {
        dispatch({
          type: "GET_USER_EVENT_INVITES_REJECTED",
          payload: error
        });
      });
  }
}
