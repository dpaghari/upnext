import React from "react";
import ActionBar from "./ActionBar";


export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="Header">
        <ActionBar currentPage={this.props.currentPage} dispatch={this.props.dispatch}/>
      </div>
    );
  }
}
