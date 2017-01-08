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
        <div class="userInfo">
            <figure>
              <img src="../../img/dan.jpg" alt="Profile Picture"/>
            </figure>
          <h5 class="userName">{user}</h5>
          <label class="currentDate"></label>
        </div>
        <div class="userActions">
          <ul>
            <li><a href="#"><i class="fa fa-home" aria-hidden="true" title="Home"></i></a></li>
            <li><a href="#"><i class="fa fa-envelope" aria-hidden="true" title="Direct Messages"></i></a></li>
            <li><a href="#"><i class="fa fa-bell" aria-hidden="true" title="Notifications"></i></a></li>
            <li><a href="#"><i class="fa fa-gear" aria-hidden="true" title="Account Settings"></i></a></li>
          </ul>
        </div>
      </div>
    );
  }
}
