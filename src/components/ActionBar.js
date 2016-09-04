import React from "react";
import { showEventForm } from "../actions/appStateActions.js";

export default class ActionBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="ActionBar">
        <ul class="actionList">
          <li class="u-action"><a onClick={this.handleAddEvent.bind(this)}href="#">Add Event</a></li>
          <li class="u-action"><a href="#">Profile</a></li>
        </ul>
      </div>
    );
  }

  handleAddEvent(e) {
    this.props.dispatch(showEventForm());
  }


}
