import React from 'react';
import EventList from "../components/EventList";
import { connect } from "react-redux";
import { fetchEvents, createEvent } from "../actions/eventsActions";

// Wrap store around Top level component
@connect((store) => {
return {
  events: store.events
};
})
export default class Layout extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  fetchEvents() {
    this.props.dispatch(fetchEvents());
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

  render() {

    const { users, events } = this.props;
    console.log(events);
    if(!events.eventList.length) {
      return <button onClick={this.fetchEvents.bind(this)}>Get Events</button>;
    }

    return (
      <div class="site-wrapper">
        <form onSubmit={this.addEvent.bind(this)}>
        <input name="eventName" ref="eventName" type="text" placeholder="Event Name"/>
        <input name="eventLocation" ref="eventLocation" type="text" placeholder="Event Location"/>
        <input name="eventDate" ref="eventDate" type="date"/>
        <input name="eventImg" ref="eventImg" type="text"/>
        <textarea name="eventDetails" ref="eventDetails" rows="4" placeholder="Event Description"/>

        <button onClick={this.addEvent.bind(this)}>Add Event</button>
        </form>
        <EventList events={events.eventList}/>
      </div>

    );
  }
}
