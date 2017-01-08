import React from 'react';

import Header from "../components/Header";
import Greeting from "../components/Greeting";
import Login from "../components/Login";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";
import { fetchEvents } from "../actions/eventsActions";

export default class Home extends React.Component {

  constructor(props) {
    super(props);
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
        <div id="Home">

          <section class="sidebar">
            <Greeting/>
            <Header currentPage={appState.currentPage} dispatch={dispatch.bind(this)}/>
            {this.renderEventForm()}
          </section>
          <section class="buzz">
              <ul>
                <li class=""><a href="#">this will be my buzz up next updates. because I make plans. I do.</a></li>
                <li class=""><a href="#">this will be my buzz up next updates. because I make plans. I do.</a></li>
              </ul>
          </section>
          <section class="upnext-list">
            <EventList dispatch={dispatch.bind(this)} events={events.eventList}/>
          </section>

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
      return (
        <div class="lightbox">
        <EventForm dispatch={dispatch.bind(this)}/>;
        </div>
      );
      else
      return null;
    }
  }
}
