import React from "react";
import { createEvent } from "../actions/eventsActions";
import { hideEventForm } from "../actions/appStateActions";



export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form id="EventForm" onSubmit={this.addEvent.bind(this)}>
      <a href="" onClick={this.handleHideEventForm.bind(this)}>Close</a>
      <input name="eventName" ref="eventName" type="text" placeholder="Event Name"/>
      <input name="eventLocation" ref="eventLocation" type="text" placeholder="Event Location"/>
      <input name="eventDate" ref="eventDate" type="date"/>
      <input name="eventImg" ref="eventImg" placeholder="Event Image URL" type="text"/>
      <textarea name="eventDetails" ref="eventDetails" rows="4" placeholder="Event Description"/>
      <button onClick={this.addEvent.bind(this)}>Add Event</button>
      </form>
    );
  }

  addEvent(e) {
    e.preventDefault();
    const { eventName, eventDate, eventLocation, eventDetails, eventImg } = this.refs;
    let newEvent = {
      name: eventName.value,
      date: eventDate.value,
      location: eventLocation.value,
      details: eventDetails.value,
      imgURL: eventImg.value
    };
    this.props.dispatch(createEvent(newEvent));
  }

  handleHideEventForm(e) {
    e.preventDefault();
    this.props.dispatch(hideEventForm());

  }

}
