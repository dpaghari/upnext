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

    const { appState, dispatch } = this.props;

    return (
      <section class="sidebar">
        <Greeting dispatch={dispatch}/>
        {this.renderEventForm()}
      </section>
    );
  }

  renderEventForm() {
    // console.log(this.props);
    const { appState, dispatch } = this.props;
    if(appState) {
      if(appState.eventForm)
      return (
        <div class="lightbox">
        <EventForm dispatch={dispatch}/>;
        </div>
      );
      else
      return null;
    }
  }
}
