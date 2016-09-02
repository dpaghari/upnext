import React from 'react';

import EventList from "../components/EventList";
import EventForm from "../components/EventForm";

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
        <EventForm addEvent={this.addEvent.bind(this)}/>
        <EventList events={events.eventList}/>
      </div>

    );
  }
}
