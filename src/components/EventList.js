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
        {this.renderEventLink()}
        <span class="eventLine"></span>
        <ul class="eventListContainer">
          <ul class="eventDateline">
              <li class="eventMonth"><h1>January</h1></li>
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
  handleCreateEvent() {
    this.props.dispatch(showEventForm());
  }

  renderEventLink() {
    return <a onClick={this.handleCreateEvent.bind(this)} href="#">Add Event</a>;
  }

}
