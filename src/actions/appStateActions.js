export function showEventForm() {
  return (dispatch) => {
    dispatch({
      type: "TOGGLE_EVENT_FORM",
      payload: true
    });
  }
}
export function hideEventForm() {
  return (dispatch) => {
    dispatch({
      type: "TOGGLE_EVENT_FORM",
      payload: false
    });
  }
}
