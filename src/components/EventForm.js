import React from "react";
import { createEvent } from "../actions/eventsActions";
import { hideEventForm } from "../actions/appStateActions";
const GoogleMapsLoader = require('google-maps'); // only for common js environments
GoogleMapsLoader.KEY = 'AIzaSyALT683365k3JbNnmRDLUNY-PfFEyJDKiM';
GoogleMapsLoader.LIBRARIES = ['places'];

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    GoogleMapsLoader.load(function(google) {
    new google.maps.places.Autocomplete(this.refs.eventLocation);
  }.bind(this));
  }

  render() {
    return (
      <form id="EventForm" onSubmit={this.addEvent.bind(this)}>
      <strong>Add New Event</strong>
      <a class="closeEventForm" href="" onClick={this.handleHideEventForm.bind(this)}>Close</a>
      <input name="eventName" ref="eventName" type="text" placeholder="Event Name"/>
      <input name="eventLocation" ref="eventLocation" type="text" placeholder="Event Location"/>
      <input name="eventDate" ref="eventDate" type="date"/>
      <input name="eventImg" ref="eventImg" placeholder="Event Image URL" type="text"/>
      <textarea name="eventDetails" ref="eventDetails" rows="4" placeholder="Event Description"/>
      <input name="eventInvites" ref="eventInvites" type="text" placeholder="Who to invite?"/>
      <label for="eventType">Private
      <input name="eventType" ref="eventType" type="radio" value="private"/>
      </label>
      <label for="eventType">Public
      <input name="eventType" ref="eventType" type="radio" value="public"/>
      </label>
      <button class="addEvent" onClick={this.addEvent.bind(this)}>Add Event</button>
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

    eventName.value = eventDate.value = eventLocation.value = eventDetails.value = eventImg.value = "";
    this.props.dispatch(hideEventForm());

  }

  handleHideEventForm(e) {
    e.preventDefault();
    this.props.dispatch(hideEventForm());

  }

}
