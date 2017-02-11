import axios from "axios";
// if I want to display from database
var userEndpoint = "../../services/get.php?";
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

export function createEvent({ name , event_date , location , details , imgURL, host, event_type, friends }) {
  return (dispatch) => {
    var data = {
      name,
      host,
      location,
      details,
      imgURL,
      event_date,
      event_type,
      friends
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
          imgURL,
          event_type,
          friends
        }
      });
      dispatch(sendInvites(friends, host, response.data));
    })
    .catch((error)=> {
      dispatch({
        type: "CREATE_EVENT_REJECTED",
        payload: error
      })
    });
  };
}

export function sendInvites(guests, host, event_id) {
  return (dispatch) => {
  let data = {
    friends : guests,
    host,
    event_id
  };
  axios.post(userEndpoint + "action=create_invites", data).then((response) => {

      dispatch({
        type: "SENT_EVENT_INVITES",
        payload: {
          invite_ids: response.data,
          host_id: host,
          event_id,
          friends : guests
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
    })
    .catch((error) => {
      dispatch({
        type: "CREATE_COMMENT_REJECTED",
        payload: error
      })
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
    .catch((error) => {
      dispatch({
        type: "FETCH_EVENT_COMMENTS_REJECTED",
        payload: error
      });
    });
  };
}
