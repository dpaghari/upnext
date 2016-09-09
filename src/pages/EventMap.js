import React from 'react';
import Header from '../components/Header';
// import { fetchEvents } from "../actions/eventsActions";

export default class EventMap extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.store.dispatch(fetchEvents());
  }

  render() {
    const { appState, dispatch } = this.props.store;
    return (
      <div id="EventMapView">
      <Header currentPage={appState.currentPage} dispatch={dispatch} />
        Event Map Man
      </div>
    );
  }

}
