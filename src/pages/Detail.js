import React from 'react';
import Header from '../components/Header';
import { fetchEvents } from "../actions/eventsActions";
import MessageBoard from "../components/MessageBoard";
import Sidebar from "../components/Sidebar";

import axios from "axios";
import { Link } from "react-router";


export default class Detail extends React.Component {

  constructor(props) {
    super(props);
    this.eventInfo = {};
    this.state = {
      gotEventInfo : false
    }
  }

  componentWillMount() {
    const eventID = this.props.params.eventId;
    this.fetchEventInfo(eventID).then((response) => {
      this.eventInfo = response.data;
      this.setState({gotEventInfo : true});
    });
  }

  fetchEventInfo(id) {
    let userEndpoint = "../../connect.php?";
    return axios.get(userEndpoint + "action=fetch_event&eventID=" + id);
  }

  render() {

    const { appState, dispatch, events, users } = this.props.store;
    return (
      <div id="DetailView">
        <Sidebar />
        {this.renderDetails()}

        <hr/>
        <MessageBoard dispatch={dispatch}/>
      </div>
    );
  }
  renderDetails() {
    if(this.state.gotEventInfo){
      const { name, imgURL, details, location, date } = this.eventInfo;
      console.log(this.eventInfo);
      return (
        <div class="detail-event-info">
        <h1>{name}</h1>
        <p>{date}</p>
        <img src={imgURL} alt="PLACEHOLDER IMAGE"/>
        <p>{location}</p>
        <p>{details}</p>
        </div>
      );
    }
    else
      return null;
  }


}
