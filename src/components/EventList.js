import React from "react";
import _ from "lodash";
import EventEntry from "./eventEntry"

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
      <div id="Events">
        <span class="eventLine"></span>
        <ul id="eventList">
          {this.renderEvents()}
        </ul>
      </div>
    );
  }

  renderEvents() {
    return _.map(this.props.events, (evnt, index) => <EventEntry key={index} {...evnt}/>);
  }
}
