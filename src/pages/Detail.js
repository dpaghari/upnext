import React from 'react';
import Header from '../components/Header';
import { fetchEvents } from "../actions/eventsActions";
import MessageBoard from "../components/MessageBoard";

export default class Detail extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.store.dispatch(fetchEvents());
  }

  render() {
    const eventId = this.props.params.eventId;
    const { appState, dispatch, events, users } = this.props.store;
    const currentEvent = events.eventList[eventId];
    console.log(events.eventList[eventId].comments);
    const { name, imgURL, details, location, date } = currentEvent;

    return (
      <div id="DetailView">
      <Header currentPage={appState.currentPage} dispatch={dispatch} />
        <div class="detail-event-info">
        <h1>{name}</h1>
        <p>{date}</p>
        <img src={imgURL} alt="PLACEHOLDER IMAGE"/>
        <p>{location}</p>
        <p>{details}</p>
        </div>
        <hr/>
        <MessageBoard dispatch={dispatch} messages={events.eventList[eventId].comments}/>
      </div>
    );
  }

}
