import React from 'react';

import Header from "../components/Header";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";

import { connect } from "react-redux";
import { fetchEvents } from "../actions/eventsActions";


// Wrap store around Top level component
@connect((store) => {
return {
  events: store.events,
  appState: store.appState
};
})
export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  fetchEvents() {
    this.props.dispatch(fetchEvents());
  }



  render() {

    const { users, events } = this.props;
    if(!events.eventList.length) {
      return <button onClick={this.fetchEvents.bind(this)}>Get Events</button>;
    }

    return (
      <div class="Home">
        <Header dispatch={this.props.dispatch.bind(this)}/>
        {this.renderEventForm()}
        <EventList events={events.eventList}/>
      </div>

    );
  }

  renderEventForm() {
    // console.log(this.props);
    const { appState } = this.props;
    if(appState) {
      if(appState.eventForm)
      return <EventForm dispatch={this.props.dispatch.bind(this)}/>;
      else
      return null;
    }
  }
}
