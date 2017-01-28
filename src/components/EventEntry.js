import React from "react";
// const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { Link } from "react-router";
import { changePage } from "../actions/appStateActions";
import { fetchUserInfo } from "../actions/usersActions";
import { getDateString } from "../Util";
import axios from "axios";

import EventHost from "./EventHost";

export default class EventEntry extends React.Component {
  constructor(props) {
    super(props);
    this.hostEndpoint = "../../services/get.php?";
    this.userInfo = {};
    this.friendsInfo = {};
    this.state = {
      gotUserInfo : false
    };
  }

  componentWillMount() {

    let { host, friends } = this.props;
    let hostP = this.fetchUser(host);
    let friendsP = this.fetchFriendsInfo(friends);
    Promise.all([hostP, friendsP]).then((responses) => {
      this.userInfo = responses[0].data;
      this.friendsInfo = responses[1].data;
      this.setState({ gotUserInfo: true });
    });
  }

  fetchUser(id) {
    return axios.get(`${this.hostEndpoint}action=get_user&userID=${id}`);
  }
  fetchFriendsInfo(friendsID) {
    // var friendsStr = JSON.stringify(friendsID);
    return axios.get(`${this.hostEndpoint}action=get_friends_info&friendIDs=${friendsID}`);
  }

  render () {
    let { event_id, imgURL, name, event_date, details, location } = this.props;
    let reformatted_date;
    if(event_date && event_date.value !== "")
      reformatted_date = getDateString(event_date);
    let pathToDetails = `/detail/${event_id}`;


    return (
      <li class="event">
        <div class="event-wrapper">
          <Link onClick={this.handleEventClick.bind(this)} to={pathToDetails}>
          <div class="event-header">
            <h2 class="event-headline">{name}</h2>
            <img src={imgURL} class=""/>
          </div>
          </Link>
          <div class="event-desc">
            {this.renderHost()}
            <div class="event-info">
              <span class="event-date">{reformatted_date}</span>
              <span class="event-loc">{location || ""}</span>
              <div class="event-friends">
                <span class="friends-going">Going:</span>
                <ul class="event-friendlist">
                {this.renderFriends()}
                </ul>
              </div>{/* end event-friends*/}
            </div>{/* end event-info*/}
          </div>{/* end event-desc*/}
          <div class="event-detail">
            <p>{details}</p>
          </div>{/* end event-detail*/}
        </div>{/* end event-wrapper*/}
      </li>
    );
  }
  renderHost() {
    if(this.state.gotUserInfo && this.userInfo)
      return <EventHost dispatch={this.props.dispatch} userInfo={this.userInfo}/>
    else
      return null;
  }


  renderFriends() {
    if(this.state.gotUserInfo){

      if(this.props.friends) {
        return _.map(JSON.parse(this.props.friends), (friend, index) => {
          let pathToFriend = "/profiles/" + friend;
          let { username, profile_picture } = this.friendsInfo[index];
          if(profile_picture)
          return <Link title={username} onClick={this.handleFriendClick.bind(this)}  key={index} to={pathToFriend} class="friend-thumb"><img src={profile_picture}/></Link>
          else
          return <Link title={username} onClick={this.handleFriendClick.bind(this)}  key={index} to={pathToFriend} class="friend-thumb"><img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg"/></Link>
        });
      }
    }
    else
      return null;
  }

  handleEventClick() {
    this.props.dispatch(changePage("detail"));
  }

  handleFriendClick() {
    this.props.dispatch(changePage("profiles"));
  }

  renderStatusBadge() {
    const { status } = this.props;
    if(status === "finished"){
      return (
        <span class="event-finished">Finished</span>
      );
    }
    else {
      return(
        <span class="event-upcoming">Upcoming</span>
      );
    }
  }

}
