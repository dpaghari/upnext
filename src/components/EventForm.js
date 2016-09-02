import React from "react";

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form id="EventForm" onSubmit={this.props.addEvent}>
      <input name="eventName" ref="eventName" type="text" placeholder="Event Name"/>
      <input name="eventLocation" ref="eventLocation" type="text" placeholder="Event Location"/>
      <input name="eventDate" ref="eventDate" type="date"/>
      <input name="eventImg" ref="eventImg" placeholder="Event Image URL" type="text"/>
      <textarea name="eventDetails" ref="eventDetails" rows="4" placeholder="Event Description"/>
      <button onClick={this.props.addEvent}>Add Event</button>
      </form>
    );
  }

}
