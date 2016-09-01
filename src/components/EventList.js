import React from "react";
import EventEntry from "./eventEntry"

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let d1 = {
      imgURL : "https://www.nps.gov/yose/planyourvisit/images/dr-tunnel-view-pp-bigweb_1.jpg",
      name : "Go to the park",
      date: "August 31, 2016",
      details: "Going to Yosemite cause its super cool"
    };

    let d2 = {
      imgURL : "https://upload.wikimedia.org/wikipedia/commons/5/5b/Waffles_with_Strawberries.jpg",
      name : "Eat Waffles",
      date: "Sept 1, 2016",
      details: "Coz why not"
    };

    let d3 = {
      imgURL : "https://pbs.twimg.com/profile_images/458967373488201729/Sck3mZXC_400x400.jpeg",
      name : "Go Ham",
      date: "Sept 2, 2016",
      details: "Coz it's tasty"
    };

    return (
      <div id="Events">
        <ul id="eventList">
          <EventEntry details={d1}/>
          <EventEntry details={d2}/>
          <EventEntry details={d3}/>
        </ul>
      </div>
    );
  }

  renderEvents() {

  }
}
