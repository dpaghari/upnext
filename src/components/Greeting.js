import React from "react";
import { Link } from "react-router";
import { showEventForm } from "../actions/appStateActions";

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
    console.log(this.props.users);
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
            <li><a href="#"><i class="fa fa-bell" aria-hidden="true" title="Notifications"></i></a></li>
            <li><a href="#"><i class="fa fa-envelope" aria-hidden="true" title="Direct Messages"></i></a></li>
            <li><a href="#"><i class="fa fa-gear" aria-hidden="true" title="Account Settings"></i></a></li>
            <li><a href="#"><i class="fa fa-th-large" aria-hidden="true" title="Memories"></i></a></li>
            <li><a href="#"><i class="fa fa-map-marker" aria-hidden="true"></i></a></li>
            <li><a onClick={this.handleCreateEvent.bind(this)} href="#"><i class="fa fa-plus" aria-hidden="true" title="Add Event"></i></a></li>

          </ul>
        </div>
      </div>
    );
  }
  handleCreateEvent() {
    this.props.dispatch(showEventForm());
  }
}
