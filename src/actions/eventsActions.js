import axios from "axios";

var userEndpoint = "../../connect.php?";
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

export function createEvent({ name , date , location , details , imgURL }) {
  // console.log(name, date, location, details, imgURL);
  return (dispatch) => {
    axios({
      method: 'get',
      url: userEndpoint + "action=create_event",
      data: {
        name,
        date,
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
