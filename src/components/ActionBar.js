import React from "react";
import { showEventForm, changePage } from "../actions/appStateActions.js";
import { logOut } from "../actions/usersActions.js";
import { Link } from "react-router";

export default class ActionBar extends React.Component {
  constructor(props) {
    super(props);
  }

  // TO-DO: Link to current-user's profile, currently hardcoded
  render() {
      return (
        <div id="ActionBar">
        <ul class="actionList">
        <li class="u-action">{this.renderEventLink()}</li>
        <li class="u-action"><Link to="/profiles/0" onClick={this.handleGoToProfile.bind(this)}>Profile</Link></li>
        <li class="u-action"><Link to="/eventmap">Event Map</Link></li>
        <li class="u-action"><Link to="/memories">Memories</Link></li>
        <li class="u-action"><Link to="/settings">Settings</Link></li>
        <li class="u-action"><Link to="#" onClick={this.handleLogout.bind(this)}>Logout</Link></li>
        </ul>
        </div>
      );
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
  handleGoToProfile(e) {
    this.props.dispatch(changePage("profiles"));
  }

  renderEventLink() {
    const { currentPage } = this.props;
    if(currentPage === "home"){
      return <a onClick={this.handleAddEvent.bind(this)} href="#">Add Event</a>;
    }
    else {
      return <Link onClick={this.handleGoToEvents.bind(this)} to="/">Events</Link>;
    }
  }

}
