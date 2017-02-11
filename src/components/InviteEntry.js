import React from "react";
import { Link } from "react-router";
import EventHost from "../components/EventHost";
import { getDateString } from "../Util";

export default class InviteEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
      if(this.props !== nextProps || this.state !== nextState) {
        return true;
      }
      else return false;
  }

  render() {
    let { event_details } = this.props;
    let { name, event_date, location, img_url, details, event_type, friends } = event_details;
    let reformatted_date = getDateString(event_date);
    return (
      <li class="invite-entry">
        <div class="invite-entry-header">
          <p class="invite-event-name">{name}</p>
          <p class="invite-event-date">{reformatted_date}</p>
          <p class="invite-event-location">{location}</p>
        </div>
        <div class="invite-entry-body">
          <p class="invite-event-detail">{details}</p>
          <a class="accept-invite-btn" href="#">Accept</a>
          <a class="decline-invite-btn" href="#">Decline</a>
        </div>
      </li>
    );
  }
}
