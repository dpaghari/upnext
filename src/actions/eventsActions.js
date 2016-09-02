import axios from "axios";

export function fetchEvents() {
  return (dispatch) => {
    axios.get("../../events.json")
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

export function createEvent({ name, date, location, details, imgURL }) {
  return (dispatch) => {
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
