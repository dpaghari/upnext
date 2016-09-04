import React from 'react';

import Header from "../components/Header";
// import EventList from "../components/EventList";
// import EventForm from "../components/EventForm";
//
// import { connect } from "react-redux";
// import { fetchEvents } from "../actions/eventsActions";


// Wrap store around Top level component
// @connect((store) => {
// return {
//   events: store.events,
//   appState: store.appState
// };
// })
export default class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }


  render() {
    return (
      <div class="DetailView">
        <Header currentPage={this.props.currentPage} dispatch={this.props.dispatch} />
        <h1>Profile View</h1>
      </div>

    );
  }

}
