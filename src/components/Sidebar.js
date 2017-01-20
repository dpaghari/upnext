import React from "react";
import ActionBar from "./ActionBar";
import Header from "./Header";
import Greeting from "./Greeting";
import EventForm from "./EventForm";

import { Link } from "react-router";
export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { appState, dispatch, users } = this.props;

    return (
      <section class="sidebar">
        <Greeting users={users} dispatch={dispatch}/>
        {this.renderEventForm()}
      </section>
    );
  }

  renderEventForm() {
    
    const { appState, dispatch, users } = this.props;
    if(appState) {
      if(appState.eventForm)
      return (
        <div class="lightbox">
          <EventForm users={users} dispatch={dispatch}/>;
        </div>
      );
      else
        return null;
    }
  }
}
