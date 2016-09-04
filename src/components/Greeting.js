import React from "react";

export default class Greeting extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let user = "Daniel";
    let today = new Date().toDateString();
    return (
      <div id="Greeting">
        <h1>Hello {user} !</h1>
        <p class="dateTime">{today}</p>
      </div>
    );
  }
}
