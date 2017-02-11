import React from 'react';
import Buzz from '../components/Buzz';
import Header from "../components/Header";
import Greeting from "../components/Greeting";
import Login from "../components/Login";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";
import Sidebar from "../components/Sidebar";
import { fetchEvents } from "../actions/eventsActions";
import { fetchUsers } from "../actions/usersActions";

export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
      if(this.props !== nextProps || this.state !== nextState) {
        return true;
      }
      else return false;
  }

  init() {
    this.fetchEvents();
    this.fetchUsers();
  }

  componentWillMount() {
    this.init();
  }

  fetchEvents() {
    this.props.store.dispatch(fetchEvents());
  }

  fetchUsers() {
    this.props.store.dispatch(fetchUsers());
  }



  render() {

    const { users, events, appState, dispatch, userInfo } = this.props.store;



    if(appState.loggedIn){
      return (
        <div id="Home">

          <Sidebar users={users} appState={appState} dispatch={dispatch} />
          <Buzz dispatch={dispatch.bind(this)} users={users}/>
          <section class="upnext-list">
            <EventList users={users} userInfo={users.userInfo} dispatch={dispatch.bind(this)} events={events.eventList}/>
          </section>

        </div>

      );
    }
    else {
      return <Login dispatch={dispatch.bind(this)}/>
    }
  }


}
