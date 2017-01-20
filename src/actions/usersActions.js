import axios from "axios";

const userEndpoint = "../../connect.php?";
// const userEndpoint = "/mockdb/users.json";

export function authUser({username, password}) {

  return (dispatch) => {
    axios.get(userEndpoint + "action=users")
         .then((response) =>  {

           dispatch({
             type: "FETCH_USERS_FULFILLED",
             payload : response.data
           });

           let enteredCreds = {
             username,
             password
           };
           let userArr = response.data;
           let result = userArr.find((el, idx) => {
             return ((el.username === enteredCreds.username) && (el.password === enteredCreds.password));
           });



           if(typeof result === "undefined") {
             dispatch({
               type: "AUTH_FAILED",
               payload: "Entered wrong credentials"
             });
           }
           else {
             let { user_id, username, profile_picture, profile_url } = result;
             let currentUserInfo = {
               user_id,
               username,
               profile_picture,
               profile_url
             };


             dispatch({
               type: "AUTH_SUCCESS",
               payload: currentUserInfo
             });
           }


         })
         .catch((error) => {
           dispatch({
             type: "FETCH_USERS_REJECTED",
             payload: error
           });
           console.log(error);
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
    axios.get("/connect.php?action=users")
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
