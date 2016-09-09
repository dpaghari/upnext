import React from 'react';
import Header from '../components/Header';
// import { fetchEvents } from "../actions/eventsActions";

export default class Memories extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.store.dispatch(fetchEvents());
  }

  render() {
    const { appState, dispatch } = this.props.store;
    return (
      <div id="MemoriesView">
      <Header currentPage={appState.currentPage} dispatch={dispatch} />
        Memories Man
      </div>
    );
  }

}
