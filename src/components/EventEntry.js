import React from "react";
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class EventEntry extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      "onHover" : false
    };
  }

  render () {
    let { imgURL, name, date, details } = this.props;
    let { onHover } = this.state;
    if (onHover) {
      return (
        <li class="event" onMouseLeave={this.toggleHover.bind(this)}>
          <div class="event-header">
            <img src={imgURL}/>
            <span class="event-headline">{name}</span>
            <span class="event-date">{date}</span>
            <p class="event-detail">{details}</p>
          </div>
        </li>
      );
    }
    else {
      return (
      <li class="event" onMouseEnter={this.toggleHover.bind(this)}>
        <div class="event-header">
          <span class="event-headline">{name}</span>
          <span class="event-date">{date}</span>
        </div>
      </li>
      );
    }
  }

  toggleHover(e) {
    this.state.onHover = !this.state.onHover;
    this.setState({
      onHover: this.state.onHover
    })
  }
}
