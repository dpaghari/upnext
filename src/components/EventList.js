import React from "react";
import _ from "lodash";
import EventEntry from "./eventEntry"

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events : [

        {
          imgURL : "https://www.nps.gov/yose/planyourvisit/images/dr-tunnel-view-pp-bigweb_1.jpg",
          name : "Go to the park",
          date: "August 31, 2016",
          details: "Going to Yosemite cause its super cool"
        }
        ,

        {
          imgURL : "https://upload.wikimedia.org/wikipedia/commons/5/5b/Waffles_with_Strawberries.jpg",
          name : "Eat Waffles",
          date: "Sept 1, 2016",
          details: "Coz why not"
        }
        ,

        {
          imgURL : "https://pbs.twimg.com/profile_images/458967373488201729/Sck3mZXC_400x400.jpeg",
          name : "Go Ham",
          date: "Sept 2, 2016",
          details: "Coz it's tasty"
        }
        ,
        {
          imgURL : "https://pbs.twimg.com/profile_images/458967373488201729/Sck3mZXC_400x400.jpeg",
          name : "Go Ham",
          date: "Sept 2, 2016",
          details: "Coz it's tasty"
        }


      ]

    };
  }

  render() {


    return (
      <div id="Events">
        <span class="eventLine"></span>
        <ul id="eventList">
          {this.renderEvents()}
        </ul>
      </div>
    );
  }

  renderEvents() {
    return _.map(this.state.events, (evnt, index) => <EventEntry key={index} {...evnt}/>);
  }
}
