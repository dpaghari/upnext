import React from "react";

export default class EventEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    let { imgURL, name, date, details } = this.props.details;
    return (
      <li class="event">
        <div class="event-header">
          <img src={imgURL}/>
          <span class="event-headline">{name}</span>
          <span class="event-date">{date}</span>
          <p class="event-detail">{details}</p>
        </div>
      </li>
    );
  }
}
