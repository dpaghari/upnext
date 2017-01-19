import axios from "axios";
// if I want to display from database
var userEndpoint = "../../connect.php?";
// var userEndpoint = "../../connect.js?";
// var userEndpoint = "../mockdb/events.json";

export function fetchEvents() {
  return (dispatch) => {
    axios.get(userEndpoint + "action=events")
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
    axios.get(userEndpoint + `action=fetch_event&eventID=${id}`)
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


export function fetchEventComments(eventID) {
  return (dispatch) => {
    axios.get(userEndpoint + `action=fetch_event_comments&eventID=${eventID}`)
    .then((response) => {
      let { id, event_id, comment } = response.data;
      dispatch({
        type: "FETCH_EVENT_COMMENTS_SUCCESS",
        payload: {
          id,
          comments : response.data
        }
      });
    })
    .catch((response) => {
      dispatch({
        type: "FETCH_EVENT_COMMENTS_REJECTED",
        payload: error
      });
    });
  };
}
