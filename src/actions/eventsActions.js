import axios from "axios";
// if I want to display from database
var userEndpoint = "../../connect.php?";
// var userEndpoint = "../../connect.js?";
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
export function fetchEventInfo(id) {
  return (dispatch) => {
    // if I want to display from database
    axios.get(userEndpoint + `action=fetch_event&eventID=${id}`)
    // axios.get(userEndpoint)
         .then((response) =>  {
           dispatch({
             type: "FETCH_EVENT_INFO_SUCCESS",
             payload : response.data
           });
         })
         .catch((error) => {
           dispatch({
             type: "FETCH_EVENT_INFO_REJECTED",
             payload: error
           })
         });

  };
}

export function createEvent({ name , event_date , location , details , imgURL, host }) {
  return (dispatch) => {
    var data = {
      name,
      host,
      location,
      details,
      imgURL,
      event_date
    };
    axios.post(userEndpoint + "action=create_event", data).then((response) => {
      // console.log(response.data);
      dispatch({
        type: "CREATE_EVENT",
        payload: {
          id: response.data,
          host,
          name,
          event_date,
          location,
          details,
          imgURL
        }
      });
    });
  };
}
