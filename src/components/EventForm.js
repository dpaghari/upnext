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
    var headline = "What's Happening?";
    return (
      <div id="EventForm">
      <strong>{headline}</strong>
      <a class="closeEventForm" href="" onClick={this.handleHideEventForm.bind(this)}><i class="fa fa-close"></i></a>
      <form onSubmit={this.addEvent.bind(this)}>
        <div class="eventMainInfo">
          <fieldset>
          <input name="eventName" ref="eventName" type="text" placeholder="My New Event"/>
          <input name="eventLocation" ref="eventLocation" type="text" placeholder="San Francisco, CA"/>
          <input name="eventDate" ref="eventDate" type="date"/>
          </fieldset>
          <img src="" class="eventImgPreview"/>
        </div>
        <div class="eventDescription">
        <fieldset>
        <input onBlur={this.handleImgUpload.bind(this)} name="eventImg" ref="eventImg" placeholder="Event Image URL" type="text"/>
        <textarea name="eventDetails" ref="eventDetails" rows="4" placeholder="Event Description"/>
        <input name="eventInvites" ref="eventInvites" type="text" placeholder="Who to invite?"/>
        </fieldset>
        <fieldset>
        <label for="eventType">Private
        <input name="eventType" ref="eventType" type="radio" value="private"/>
        </label>
        <label for="eventType">Public
        <input name="eventType" ref="eventType" type="radio" value="public"/>
        </label>
        </fieldset>
        </div>
        <button class="addEvent" onClick={this.addEvent.bind(this)}>Add Event</button>
      </form>
      </div>
    );
  }

  handleImgUpload(e) {
    document.querySelector(".eventImgPreview").setAttribute("src", e.target.value);
  }

  addEvent(e) {
    e.preventDefault();
    const { eventName, eventDate, eventLocation, eventDetails, eventImg } = this.refs;
    console.log(this.props.users.current_user_id);
    let newEvent = {
      host: this.props.users.current_user_id,
      name: eventName.value,
      event_date: new Date(eventDate.value).toUTCString(),
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
