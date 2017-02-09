import React from "react";
import { Link } from "react-router";
import { showEventForm, changePage } from "../actions/appStateActions";
import { logOut } from "../actions/usersActions";

export default class Greeting extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
      if(this.props !== nextProps || this.state !== nextState) {
        return true;
      }
      else return false;
  }


  render() {
    let { username, profile_url, profile_picture } = this.props.users.current_user;
    // let user = "Daniel";

    // let today = new Date().toDateString();
    let pathToUser = `/profiles/${profile_url}`;
    return (
      <div id="Greeting">

        <Link class="homeBtn" to="/"><i class="fa fa-arrow-circle-up" aria-hidden="true" title="Upnext"></i></Link>
        <div class="userInfo">
          <Link to={pathToUser}>
            <figure>
              <img src={profile_picture} alt="Profile Picture"/>
            </figure>
          <label class="userName">{username}</label>
          </Link>
        </div>
        <div class="userActions">
          <ul>
            <li><Link onClick={this.handleGoToNotifications.bind(this)} to="/notifications"><i class="fa fa-bell" aria-hidden="true" title="Notifications"></i></Link></li>
            <li><Link onClick={this.handleGoToInvites.bind(this)} to="/invites"><i class="fa fa-envelope" aria-hidden="true" title="Direct Messages"></i></Link></li>
            <li><Link onClick={this.handleGoToSettings.bind(this)} to="/settings"><i class="fa fa-gear" aria-hidden="true" title="Account Settings"></i></Link></li>
            <li><Link onClick={this.handleGoToMemories.bind(this)} to="/memories"><i class="fa fa-th-large" aria-hidden="true" title="Memories"></i></Link></li>
            <li><Link onClick={this.handleGoToEventMap.bind(this)} to="/eventmap"><i class="fa fa-map-marker" aria-hidden="true" title="Event Map"></i></Link></li>
            <li><Link onClick={this.handleLogout.bind(this)} href="#"><i class="fa fa-sign-out" aria-hidden="true" title="Logout"></i></Link></li>
            <li><a onClick={this.handleCreateEvent.bind(this)} href="#"><i class="fa fa-plus" aria-hidden="true" title="Add Event"></i></a></li>

          </ul>
        </div>
      </div>
    );
  }
  handleCreateEvent() {
    this.props.dispatch(showEventForm());
  }

  handleLogout() {
    this.props.dispatch(logOut());
    this.props.dispatch(changePage('home'));
  }
  handleGoToInvites() {
    this.props.dispatch(changePage('invites'));
  }
  handleGoToEventMap() {
    this.props.dispatch(changePage('eventmap'));
  }
  handleGoToNotifications() {
    this.props.dispatch(changePage('notifications'));
  }
  handleGoToMemories() {
    this.props.dispatch(changePage('memories'));
  }
  handleGoToSettings() {
    this.props.dispatch(changePage('settings'));
  }
}
