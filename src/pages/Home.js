import React from 'react';

import Header from "../components/Header";
import Greeting from "../components/Greeting";
import Login from "../components/Login";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";

// import { connect } from "react-redux";
import { fetchEvents } from "../actions/eventsActions";
//
//
// // Wrap store around Top level component
// @connect((store) => {
// return {
//   users: store.users,
//   events: store.events,
//   appState: store.appState
// };
// })

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentWillMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.props.store.dispatch(fetchEvents());
  }



  render() {

    const { users, events, appState, dispatch } = this.props.store;

    if(appState.loggedIn){
      return (
        <div class="Home">
        <Greeting/>
        <Header currentPage={appState.currentPage} dispatch={dispatch.bind(this)}/>
        {this.renderEventForm()}
        <EventList dispatch={dispatch.bind(this)} events={events.eventList}/>
        </div>

      );
    }
    else {
      return <Login dispatch={dispatch.bind(this)}/>
    }
  }

  renderEventForm() {
    // console.log(this.props);
    const { appState, dispatch } = this.props.store;
    if(appState) {
      if(appState.eventForm)
      return <EventForm dispatch={dispatch.bind(this)}/>;
      else
      return null;
    }
  }
}
