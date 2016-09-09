import React from 'react';
import Header from '../components/Header';
// import { fetchEvents } from "../actions/eventsActions";

const GoogleMapsLoader = require('google-maps'); // only for common js environments
GoogleMapsLoader.KEY = 'AIzaSyALT683365k3JbNnmRDLUNY-PfFEyJDKiM';
GoogleMapsLoader.LIBRARIES = ['places'];

export default class EventMap extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((pos)=> {
      const { coords } = pos;
      GoogleMapsLoader.load(function(google) {
      new google.maps.Map(document.getElementById("EventMap"), {
        center: {lat: coords.latitude, lng: coords.longitude},
        zoom: 12
      });
    }, (error) => {
        console.log("error retrieving coordinates");
    });

  });
    // this.props.store.dispatch(fetchEvents());
  }

  render() {
    const { appState, dispatch } = this.props.store;
    return (
      <div id="EventMapView">
      <Header currentPage={appState.currentPage} dispatch={dispatch} />
        <div id="EventMap"></div>
      </div>
    );
  }

}
