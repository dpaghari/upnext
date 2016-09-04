import React from 'react';
import Header from '../components/Header';
import { fetchEvents } from "../actions/eventsActions";

export default class Detail extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentWillMount() {
    this.props.store.dispatch(fetchEvents());
  }
  render() {
    const eventId = this.props.params.eventId;
    const { appState, dispatch, events, users } = this.props.store;
    const currentEvent = events.eventList[eventId];
    console.log(currentEvent);
    const { name, imgURL, details, location, date } = currentEvent;
    
    return (
      <div class="DetailView">
      <Header currentPage={appState.currentPage} dispatch={dispatch} />
        <div class="detail-event-info">
        <h1>{name}</h1>
        <p>{date}</p>
        <img src={imgURL} alt="PLACEHOLDER IMAGE"/>
        <p>{location}</p>
        <p>{details}</p>
        </div>
        <div class="detail-message-board">
          <ul class="message-board-list">
            <li class="message-board-msg">
              <img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg" placeholder="USER PROFILE PICTURE"/>
              <p>User Name</p>
              <p>User Comment</p>
            </li>
            <li class="message-board-msg">
              <img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg" placeholder="USER PROFILE PICTURE"/>
              <p>User Name</p>
              <p>User Comment</p>
            </li>
            <li class="message-board-msg">
              <img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg" placeholder="USER PROFILE PICTURE"/>
              <p>User Name</p>
              <p>User Comment</p>
            </li>
            <li class="message-board-msg">
              <img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg" placeholder="USER PROFILE PICTURE"/>
              <p>User Name</p>
              <p>User Comment</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}
