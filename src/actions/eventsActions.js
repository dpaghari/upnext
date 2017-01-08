import axios from "axios";
// if I want to display from database
var userEndpoint = "../../connect.php?";
// var userEndpoint = "../mockdb/events.json";

export function fetchEvents() {
  return (dispatch) => {
    // if I want to display from database
    axios.get(userEndpoint + "action=events")
    // axios.get(userEndpoint)
         .then((response) =>  {
           dispatch({
             type: "FETCH_EVENTS_FULFILLED",
             payload : response.data
           });
         })
         .catch((error) => {
           dispatch({
             type: "FETCH_EVENTS_REJECTED",
             payload: error
           })
         });

  };
}

export function createEvent({ name , date , location , details , imgURL }) {
  console.log(name, date, location, details, imgURL);
  return (dispatch) => {
    axios.get(userEndpoint + "action=create_event", {
      params : {
        name,
        location,
        details,
        imgURL
      }
    });
    dispatch({
      type: "CREATE_EVENT",
      payload: {
        name,
        date,
        location,
        details,
        imgURL
      }
    });
  }
}
