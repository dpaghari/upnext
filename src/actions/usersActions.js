import axios from "axios";

export function authUser({username, password}) {
  return (dispatch) => {
    axios.get("../../mockdb/users.json")
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
             dispatch({
               type: "AUTH_SUCCESS",
               payload: true
             });
           }


         })
         .catch((error) => {
           dispatch({
             type: "FETCH_USERS_REJECTED",
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
    axios.get("../../mockdb/users.json")
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
