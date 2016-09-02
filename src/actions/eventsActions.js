import axios from "axios";

export function fetchEvents() {
  return (dispatch) => {
    axios.get("../../events.json")
         .then((response) =>  {
           dispatch({
             type: "FETCH_EVENTS_FULFILLED",
             payload : response.data;
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

export function createEvent() {
  return {
    type: "EVENT_CREATED",
    payload: {
      name: "New Event",
      date: "Sept 2, 2016"
    }
  }
}
