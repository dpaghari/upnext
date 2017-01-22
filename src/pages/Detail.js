import React from 'react';
import Header from '../components/Header';
import { fetchEvents, fetchEventComments, fetchEventInfo } from "../actions/eventsActions";
import MessageBoard from "../components/MessageBoard";
import Sidebar from "../components/Sidebar";
import { getDateString } from "../Util";

import axios from "axios";
import { Link } from "react-router";


export default class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.eventInfo = {};
    this.state = {
      gotEventInfo : false
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
      if(this.props !== nextProps || this.state !== nextState) {
        return true;
      }
      else return false;
  }

  componentWillMount() {
    const eventID = this.props.params.eventId;
    this.props.store.dispatch(fetchEventComments(eventID));
    this.props.store.dispatch(fetchEventInfo(eventID));
  }

  render() {

    const { appState, dispatch, events, users } = this.props.store;

    return (
      <div id="DetailView">
        <Sidebar users={users} appState={appState} dispatch={dispatch} />
        {this.renderDetails()}
        {this.renderMessageBoard()}
      </div>
    );
  }

  renderMessageBoard() {
    let { events, dispatch, users } = this.props.store;
    if(events.event_comments) {
      return <MessageBoard currentUser={users.current_user} dispatch={dispatch} comments={events.event_comments.comments} eventID={this.props.params.eventId}/>;
    }
    else {
      return null;
    }
  }

  renderDetails() {
    let { eventInfo } = this.props.store.events;
    if(eventInfo){

      const { name, imgURL, details, location, event_date, friends } = eventInfo;
      let reformatted_date = getDateString(event_date);
      return (
        <div class="detail-event-info">
          <div class="detail-event-header">
          <div class="header-col-1">
          <h1>{name}</h1>
          <p>{location}</p>
          <p>{event_date}</p>
          <p>{details}</p>
          </div>
          <div class="header-col-2">
          <img src={imgURL} alt="Event Image"/>
          <div class="event-guests">
            <ul>
              <li class="event-host"><img src="" alt="host"/><span class="event-host-name">Daniel Pagharion</span></li>
              <li class="event-guest"><img src="" alt="guest"/><span class="event-guest-name">Nick Smith</span></li>
              <li class="event-guest"><img src="" alt="guest"/><span class="event-guest-name">Emily Anderson</span></li>
              <li class="event-guest"><img src="" alt="guest"/><span class="event-guest-name">Kelsey Raczak</span></li>
            </ul>
          </div>
          </div>
          </div>
          <div class="detail-event-body">
          </div>
        </div>
      );
    }
    else
      return null;
  }


}
