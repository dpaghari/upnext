import React from "react";
// const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { Link } from "react-router";
import { changePage } from "../actions/appStateActions";


export default class EventEntry extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      "onHover" : false
    };
  }

  render () {
    let { imgURL, name, host, date, details, location, friends, id } = this.props;
    let { onHover } = this.state;
    let pathToDetails = "/detail/" + id;
    if (onHover) {
      return (
        <li class="event" onMouseLeave={this.toggleHover.bind(this)}>
          <div class="event-wrapper">
            <Link onClick={this.handleEventClick.bind(this)} to={pathToDetails}>
            <div class="event-header">
              <img src={imgURL}/>
              <span class="event-headline">{name}</span>
              <span class="event-date">{date}</span>
              <span class="event-host">Host: {host.name}</span>
            </div>
            </Link>
            <div class="event-expand">
              <span class="event-loc">{location}</span>
              <p class="event-detail">{details}</p>
              <span class="friends-going">Going:</span>
              <div class="event-friends">
                {this.renderFriends()}
              </div>
            </div>
          </div>
        </li>
      );
    }
    else {
      return (
      <li class="event" onMouseEnter={this.toggleHover.bind(this)}>
        <div class="event-header">
          <span class="event-headline">{name}</span>
          <span class="event-date">{date}</span>
          <span class="event-host">Host: {host.name}</span>
        </div>
      </li>
      );
    }
  }

  renderFriends() {
    return _.map(this.props.friends, (friend, index) => {
    let pathToFriend = "/profiles/" + friend.id;
    if(friend.profile_picture !== "")
      return <Link onClick={this.handleFriendClick.bind(this)} key={index} to={pathToFriend} class="friend-thumb"><img src={friend.profile_picture}/></Link>
    else
      return <Link onClick={this.handleFriendClick.bind(this)} key={index} to={pathToFriend} class="friend-thumb"><img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg"/></Link>

    });
  }

  handleEventClick() {
    this.props.dispatch(changePage("detail"));
  }

  handleFriendClick() {
    this.props.dispatch(changePage("profiles"));
  }

  toggleHover(e) {
    this.state.onHover = !this.state.onHover;
    this.setState({
      onHover: this.state.onHover
    });

  }
}
