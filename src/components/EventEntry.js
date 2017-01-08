import React from "react";
// const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { Link } from "react-router";
import { changePage } from "../actions/appStateActions";


export default class EventEntry extends React.Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   "onHover" : false
    // };
  }
  //TO-DO: Use event status to display a badge or something i.e red = finished green = upcoming
  render () {
    let { imgURL, name, host, date, details, location, friends, id, status } = this.props;
    // let { onHover } = this.state;
    let pathToDetails = "/detail/" + id;
    return (
        <li class="event">
          <div class="event-wrapper">
            {this.renderStatusBadge()}
            <Link onClick={this.handleEventClick.bind(this)} to={pathToDetails}>
            <div class="event-header">
              <span class="event-headline">{name}</span>
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
    return _.map(this.props.friends, (friend, index) => {
    let pathToFriend = "/profiles/" + friend.id;
    if(friend.profile_picture !== "")
      return <Link onClick={this.handleFriendClick.bind(this)} title={friend.name} key={index} to={pathToFriend} class="friend-thumb"><img src={friend.profile_picture}/></Link>
    else
      return <Link onClick={this.handleFriendClick.bind(this)} title={friend.name} key={index} to={pathToFriend} class="friend-thumb"><img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg"/></Link>

    });
  }

  renderHost(host) {
    return (
      <div class="event-host-panel">
        <Link onClick={this.handleEventClick.bind(this)} to={"profiles/" + host.profile_url}>
        <img class="event-host-pic" alt="event-host-picture"/>
        <span class="event-host">{host.name}</span>
        </Link>
      </div>
    );
  }

  handleEventClick() {
    this.props.dispatch(changePage("detail"));
  }

  handleFriendClick() {
    this.props.dispatch(changePage("profiles"));
  }

  // toggleHover(e) {
  //   this.state.onHover = !this.state.onHover;
  //   this.setState({
  //     onHover: this.state.onHover
  //   });
  //
  // }

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
