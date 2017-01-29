import React from 'react';
import Header from '../components/Header';
import { fetchEvents, fetchEventComments, fetchEventInfo } from "../actions/eventsActions";
import MessageBoard from "../components/MessageBoard";
import Sidebar from "../components/Sidebar";
import { getDateString } from "../Util";
import EventHost from "../components/EventHost";

import axios from "axios";
import { Link } from "react-router";


export default class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.hostEndpoint = "../../services/get.php?";
    this.userInfo = {};
    this.friendsInfo = {};
    this.state = {
      gotUserInfo: false
    };
  }

  componentDidMount() {
    const eventID = this.props.params.eventId;
    this.props.store.dispatch(fetchEventComments(eventID));
    this.props.store.dispatch(fetchEventInfo(eventID));
    let { eventInfo } = this.props.store.events;
    let hostP = this.fetchUser(eventInfo.host);
    let friendsP = this.fetchFriendsInfo(eventInfo.friends);
    Promise.all([hostP, friendsP]).then((responses) => {
      this.userInfo = responses[0].data;
      this.friendsInfo = responses[1].data;
      this.setState({ gotUserInfo: true });
    });
  }



  componentDidUpdate() {

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
    console.log(eventInfo);
    if(eventInfo){

      const { name, imgURL, details, location, event_date, friends } = eventInfo;
      let reformatted_date = getDateString(event_date);
      return (
        <div class="detail-event-info">
          <div class="detail-event-header">
          <div class="header-col-1">
          <h1>{name}</h1>
          <p>{location}</p>
          <p>{reformatted_date}</p>
          <p>{details}</p>
          </div>
          <div class="header-col-2">
          <img src={imgURL} alt="Event Image"/>
          <div class="event-guests">
            <ul>
              {this.renderHost()}
              {this.renderFriends()}
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

  fetchUser(id) {
    return axios.get(`${this.hostEndpoint}action=get_user&userID=${id}`);
  }
  fetchFriendsInfo(friendsID) {
    // var friendsStr = JSON.stringify(friendsID);
    return axios.get(`${this.hostEndpoint}action=get_friends_info&friendIDs=${friendsID}`);
  }

  renderFriends() {
    if(this.state.gotUserInfo){

      if(this.friendsInfo) {
        let placeholderImg = "https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg";
        return _.map(this.friendsInfo, (friend, index) => {
          let pathToFriend = "/profiles/" + friend;
          let { username, profile_picture } = this.friendsInfo[index];
          if(profile_picture)
          return <Link title={username} onClick={this.handleFriendClick.bind(this)}  key={index} to={pathToFriend} class="event-guest friend-thumb"><img src={profile_picture || placeholderImg}/></Link>
        });
      }
    }
    else
      return null;
  }

  renderHost() {
    if(this.state.gotUserInfo && this.userInfo)
      return <EventHost dispatch={this.props.dispatch} userInfo={this.userInfo}/>
    else
      return null;
  }
  handleFriendClick() {
    this.props.dispatch(changePage("profiles"));
  }


}
