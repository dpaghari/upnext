import React from "react";
import _ from "lodash";
import EventEntry from "./EventEntry"
import { showEventForm } from "../actions/appStateActions";

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "displayMonth" : "January"
    };
    this.marker = 470;
    this.month = 0;
    this.ticking = false;
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  }

  shouldComponentUpdate(nextProps, nextState) {
      if(this.props !== nextProps || this.state !== nextState) {
        return true;
      }
      else return false;
  }

  render() {
    console.log(this.props.event);
    return (
      <div id="Events">
        {this.renderEventLink()}
        <span class="eventLine"></span>
        <ul onScroll={this.handleScroll.bind(this)}  class="eventListContainer">
          <ul class="eventDateline">
              <li class="eventMonth"><h1>{this.state.displayMonth}</h1></li>
          </ul>
          <ul class="eventList">
            {this.renderEvents()}
            {this.renderCreateEvent()}
          </ul>
        </ul>
      </div>
    );
  }

  renderEvents() {
    return _.map(this.props.events, (evnt, index) => <EventEntry key={index} {...evnt} dispatch={this.props.dispatch} userInfo={this.props.userInfo} users={this.props.users}/>);
  }
  renderCreateEvent() {
    return (
      <li class="event">
        <a href="#" style={{width: "100%"}} onClick={this.handleCreateEvent.bind(this)}>
          <div class="event-header" style={{border: "2px dashed #999", padding: "60px" }}>
            <span class="event-headline">+</span>
          </div>
        </a>
      </li>
    );
  }

  handleScroll(e) {

    let last_known_scroll_position = e.target.scrollLeft;

    if (!this.ticking) {
    window.requestAnimationFrame(() => {
      if(last_known_scroll_position > this.marker) {

      this.marker = this.marker + 470;
      this.month++;
      this.setState({displayMonth : this.monthNames[this.month]});
      }
      this.ticking = false;
    });
    }
    this.ticking = true;
  }

  handleCreateEvent() {
    this.props.dispatch(showEventForm());
  }

  renderEventLink() {
    return <a onClick={this.handleCreateEvent.bind(this)} href="#" class="addLink"><i class="fa fa-plus"></i></a>;
  }
}
