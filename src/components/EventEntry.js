import React from "react";
// const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { Link } from "react-router";
import { changePage } from "../actions/appStateActions";


export default class EventEntry extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    let { imgURL, name, host, date, details, location, friends, id, status } = this.props;

    let pathToDetails = "/detail/" + id;
    return (
        <li class="event">
          <div class="event-wrapper">
            {this.renderStatusBadge()}
            <Link onClick={this.handleEventClick.bind(this)} to={pathToDetails}>
            <div class="event-header">
              <img src={imgURL} alt="yosemite" class=""/>
              <h2 class="event-headline">{name}</h2>
            </div>
            </Link>
            <div class="event-desc">

              {this.renderHost(host)}
              <div class="event-info">
                <span class="event-date">{date}</span>
                <span class="event-loc">{location}</span>
                <div class="event-friends">
                  <span class="friends-going">Going:</span>
                  <ul class="event-friendlist">
                    {this.renderFriends()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
    );
  }

  renderFriends() {
    // TO-DO: Get Friend User Details based on friend ID ; getUserDetails();
    return _.map(JSON.parse(this.props.friends), (friend, index) => {
    let pathToFriend = "/profiles/" + friend;
    // if(friend.profile_picture !== "")
      // return <Link onClick={this.handleFriendClick.bind(this)} title={friend.name} key={index} to={pathToFriend} class="friend-thumb"><img src={friend.profile_picture}/></Link>
    // else
      return <Link onClick={this.handleFriendClick.bind(this)} title={friend.name} key={index} to={pathToFriend} class="friend-thumb"><img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg"/></Link>

    });
  }

  renderHost(host) {
    var hostID = parseInt(host) || 0;
    // TO-DO: Get User Details based on hostID ; getUserDetails();
    // console.log(typeof host, host);
    if(hostID){
      return (
        <div class="event-host-panel">
        <Link onClick={this.handleEventClick.bind(this)} to={"profiles/" + hostID}>
          <div class="img-wrapper">
            <img src="https://comeonhitme.files.wordpress.com/2013/07/s3-jon-snow.jpg" class="event-host-pic" alt="event-host-picture"/>
          </div>
        <h5 class="event-host">{hostID}</h5>
        </Link>
        </div>
      );
    }
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
