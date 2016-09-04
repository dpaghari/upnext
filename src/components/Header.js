import React from "react";
import ActionBar from "./ActionBar";
import Greeting from "./Greeting";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="Header">
        <Greeting/>
        <ActionBar dispatch={this.props.dispatch}/>
      </div>
    );
  }
}
