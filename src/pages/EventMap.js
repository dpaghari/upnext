import React from 'react';
import Header from '../components/Header';
// import { fetchEvents } from "../actions/eventsActions";
// window["jsonp"] = jsonp;
const GoogleMapsLoader = require('google-maps'); // only for common js environments
GoogleMapsLoader.KEY = 'AIzaSyALT683365k3JbNnmRDLUNY-PfFEyJDKiM';
GoogleMapsLoader.LIBRARIES = ['places'];
let tr_g_u_loc;
export default class EventMap extends React.Component {

  constructor(props) {
    super(props);
    tr_g_u_loc = new Promise((resolve, reject) => {

      let userCoords = {};
      let userIP;
      jsonp("https://ipinfo.io/", function(res) {
        userIP = res.ip;
        jsonp("http://www.tigeoip.com/?token=8765FRCfs!87&ip=" + userIP, function(innerRes) {

          userCoords.lat = innerRes.latitude;
          userCoords.lng = innerRes.longitude;
          userCoords.city = innerRes.city;
          resolve(userCoords);
        });
      });
    });


  }

  componentDidMount() {
    tr_g_u_loc.then((pos)=> {
      const { lat, lng } = pos;
      console.log(lat, lng);
      GoogleMapsLoader.load(function(google) {
      new google.maps.Map(document.getElementById("EventMap"), {
        center: {lat, lng},
        zoom: 12
      });

      new google.maps.places.Autocomplete(this.refs.eventLocator);
    }.bind(this), (error) => {
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
        <div class="eventLocator">
          <input type="text" name="eventLocator" ref="eventLocator"/>
        </div>
        <div id="EventMap"></div>
      </div>
    );
  }

}

function jsonp(url, callback) {
  var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  window[callbackName] = function(data) {
      delete window[callbackName];
      document.head.removeChild(script);
      callback(data);
  };

  var script = document.createElement('script');
  script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
  document.head.appendChild(script);
}
