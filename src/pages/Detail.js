import React from 'react';
import Header from '../components/Header';
import { fetchEvents, fetchEventComments } from "../actions/eventsActions";
import MessageBoard from "../components/MessageBoard";
import Sidebar from "../components/Sidebar";

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
    // const { appState, dispatch, events, users } = this.props.store;
    this.props.store.dispatch(fetchEventComments(eventID));
    this.fetchEventInfo(eventID).then((response) => {
      this.eventInfo = response.data;
      this.setState({gotEventInfo : true});
    });
  }

  fetchEventInfo(id) {
    let userEndpoint = "../../connect.php?";
    return axios.get(userEndpoint + "action=fetch_event&eventID=" + id);
  }

  render() {

    const { appState, dispatch, events, users } = this.props.store;

    return (
      <div id="DetailView">
        <Sidebar users={users} appState={appState} dispatch={dispatch} />
        {this.renderDetails()}

        <hr/>
        {this.renderMessageBoard()}
      </div>
    );
  }

  renderMessageBoard() {
    let { events, dispatch } = this.props.store;
    console.log("render message board", events);
    if(events.event_comments) {
      return <MessageBoard dispatch={dispatch} comments={events.event_comments.comments} event_id={this.props.params.eventId}/>;
    }
    else {
      return null;
    }
  }

  renderDetails() {
    if(this.state.gotEventInfo){
      const { name, imgURL, details, location, date, friends } = this.eventInfo;
      // console.log(this.eventInfo);
      return (
        <div class="detail-event-info">
          <div class="detail-event-header">
          <div class="header-col-1">
          <h1>{name}</h1>
          <p>{location}</p>
          <p>{date}</p>
          <p>{details}</p>
          </div>
          <div class="header-col-2">
          <img src={imgURL} alt="PLACEHOLDER IMAGE"/>
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
          <hr/>
          <div class="detail-event-body">
          </div>
        </div>
      );
    }
    else
      return null;
  }


}
