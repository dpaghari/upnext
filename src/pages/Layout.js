import React from 'react';
//
// import Header from "../components/Header";
// import EventList from "../components/EventList";
// import EventForm from "../components/EventForm";

// import { connect } from "react-redux";
// import { fetchEvents } from "../actions/eventsActions";


// Wrap store around Top level component
// @connect((store) => {
// return {
//   events: store.events,
//   appState: store.appState
// };
// })
export default class Layout extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    // const { users, events } = this.props;
    // if(!events.eventList.length) {
    //   return <button onClick={this.fetchEvents.bind(this)}>Get Events</button>;
    // }

    return (
      <div class="site-wrapper">
        {this.props.children}
      </div>

    );
  }


}
