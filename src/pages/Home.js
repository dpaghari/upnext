import React from 'react';
import Buzz from '../components/Buzz';
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

    const { users, events, appState, dispatch, userInfo } = this.props.store;


    if(appState.loggedIn){
      return (
        <div id="Home">

          <section class="sidebar">
            <Greeting/>
            <Header currentPage={appState.currentPage} dispatch={dispatch.bind(this)}/>
            {this.renderEventForm()}
          </section>
          <Buzz dispatch={dispatch.bind(this)} users={users}/>

          <section class="upnext-list">
            <EventList userInfo={users.userInfo} dispatch={dispatch.bind(this)} events={events.eventList}/>
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
