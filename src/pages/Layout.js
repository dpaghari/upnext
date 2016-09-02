import React from 'react';
import EventList from "../components/EventList";
import { connect } from "react-redux";

@connect((store) => {
return {
  events: store.events
};
})
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.events);
    this.state = {

    };
  }

  render() {
    return (
      <div class="site-wrapper">
           {this.props.children}
           <EventList/>
      </div>

    );
  }
}
