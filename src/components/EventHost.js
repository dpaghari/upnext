import React from "react";
import { Link } from "react-router";
import { changePage } from "../actions/appStateActions";

export default class EventHost extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let { user_id,  username , profile_picture } = this.props.userInfo;
    return (
      <div class="event-host-panel">
      <Link class="event-host" onClick={this.handleEventClick.bind(this)} to={"/profiles/" + user_id}>
      <div class="img-wrapper">
      {this.renderHostPicture(profile_picture)}
      </div>
      <h5 class="event-host-name">{username}</h5>
      </Link>
      </div>
    );
  }

  handleEventClick() {
    this.props.dispatch(changePage("detail"));
  }

  renderHostPicture(url) {
    var imgURL = url || "https://comeonhitme.files.wordpress.com/2013/07/s3-jon-snow.jpg";
    return <img src={imgURL} class="event-host-pic" alt="event-host-picture"/>;
  }

  renderHostName(name) {
    if(name) return name; else return "no name";
  }
}
