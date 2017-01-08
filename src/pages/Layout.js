import React from 'react';
import { connect } from "react-redux";
import { fetchEvents } from "../actions/eventsActions";


// Wrap store around Top level component
@connect((store) => {
return {
  users: store.users,
  events: store.events,
  appState: store.appState
};
})
export default class Layout extends React.Component {
  render() {
    return (
      <main class="site-wrapper">
        {React.cloneElement(this.props.children, {store: this.props})}
      </main>

    );
  }

}
