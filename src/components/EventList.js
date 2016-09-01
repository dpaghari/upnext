import React from "react";

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="Events">
        <ul id="eventList">
          <li class="event">Go to the park</li>
          <li class="event">Eat Waffles</li>
          <li class="event">Go ham</li>
          <li class="event">Go hard in the paint</li>
        </ul>
      </div>
    );
  }

  renderEvents() {

  }
}
