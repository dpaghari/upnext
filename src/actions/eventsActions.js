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

      dispatch({
        type: "CREATE_EVENT",
        payload: {
          event_id: response.data,
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

export function createComment({ event_id, user_id, comment, profile_picture }) {
  return (dispatch) => {
    var data = {
      event_id,
      user_id,
      comment,
      profile_picture
    };
    axios.post(userEndpoint + "action=create_new_comment", data).then((response) => {

      dispatch({
        type: "CREATE_COMMENT",
        payload: {
          comment_id: response.data,
          event_id,
          user_id,
          comment,
          profile_picture
        }
      });
    });
  };
}

export function fetchEventComments(eventID) {
  return (dispatch) => {
    axios.get(userEndpoint + `action=fetch_event_comments&eventID=${eventID}`)
    .then((response) => {
      dispatch({
        type: "FETCH_EVENT_COMMENTS_SUCCESS",
        payload: {
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
