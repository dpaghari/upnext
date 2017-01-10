import React from "react";
import ActionBar from "./ActionBar";

import { Link } from "react-router";
export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="Header">
        <Link to="/">Back</Link>
      </div>
    );
  }
}
