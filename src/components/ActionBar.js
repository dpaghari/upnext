import React from "react";
import { showEventForm, changePage } from "../actions/appStateActions.js";
import { logOut } from "../actions/usersActions.js";
import { Link } from "react-router";

export default class ActionBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentPage } = this.props;
    if(currentPage === "home"){
      return (
        <div id="ActionBar">
        <ul class="actionList">
        <li class="u-action"><a onClick={this.handleAddEvent.bind(this)}href="#">Add Event</a></li>
        <li class="u-action"><a href="#">Profile</a></li>
        <li class="u-action"><a href="#">Event Map</a></li>
        <li class="u-action"><a href="#">Memories</a></li>
        <li class="u-action"><a href="#">Settings</a></li>
        <li class="u-action"><a onClick={this.handleLogout.bind(this)}href="#">Logout</a></li>
        </ul>
        </div>
      );
    }
    else {
      return(
        <div id="ActionBar">
        <ul class="actionList">
        <li class="u-action"><Link onClick={this.handleGoToEvents.bind(this)} to="/home">Events</Link></li>
        <li class="u-action"><a href="#">Profile</a></li>
        <li class="u-action"><a href="#">Event Map</a></li>
        <li class="u-action"><a href="#">Memories</a></li>
        <li class="u-action"><a href="#">Settings</a></li>
        <li class="u-action"><a onClick={this.handleLogout.bind(this)}href="#">Logout</a></li>
        </ul>
        </div>
      );
    }
  }

  handleAddEvent(e) {
    this.props.dispatch(showEventForm());
  }
  handleGoToEvents(e) {
    this.props.dispatch(changePage("home"));
  }
  handleLogout(e) {
    this.props.dispatch(logOut());
  }


}
