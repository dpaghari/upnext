import React from "react";
import _ from "lodash";
import EventEntry from "./EventEntry"

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
      <div id="Events">
        <span class="eventLine"></span>
        <ul class="eventListContainer">
          <ul class="eventDateline">
          <li class="eventMonth">January</li>
          <li class="eventMonth">February</li>
          <li class="eventMonth">March</li>
          <li class="eventMonth">April</li>
          <li class="eventMonth">May</li>
          <li class="eventMonth">June</li>
          <li class="eventMonth">July</li>
          <li class="eventMonth">August</li>
          <li class="eventMonth">September</li>
          <li class="eventMonth">October</li>
          <li class="eventMonth">November</li>
          <li class="eventMonth">December</li>
          </ul>
          <div class="eventList">
          {this.renderEvents()}
          {this.renderCreateEvent()}
          </div>
        </ul>
      </div>
    );
  }

  renderEvents() {
    return _.map(this.props.events, (evnt, index) => <EventEntry key={index} {...evnt} dispatch={this.props.dispatch}/>);
  }
  renderCreateEvent() {
    return (
      <li class="event">
        <a href="#" style={{width: "100%"}}>
          <div class="event-header" style={{border: "2px dashed #999", padding: "60px" }}>
            <span class="event-headline">+</span>
          </div>
        </a>
      </li>
    );
  }
}
