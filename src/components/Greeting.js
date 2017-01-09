import React from "react";
import { Link } from "react-router";


export default class Greeting extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let user = "Daniel";
    let today = new Date().toDateString();
    let pathToUser = '/profiles/1';
    return (
      <div id="Greeting">
        <div class="userInfo">
          <Link to={pathToUser}>
            <figure>
              <img src="../../img/dan.jpg" alt="Profile Picture"/>
            </figure>
          <label class="userName">{user}</label>
          </Link>
        </div>
        <div class="userActions">
          <ul>
            <li><a href="#"><i class="fa fa-bell" aria-hidden="true" title="Notifications"></i></a></li>
            <li><a href="#"><i class="fa fa-envelope" aria-hidden="true" title="Direct Messages"></i></a></li>
            <li><a href="#"><i class="fa fa-gear" aria-hidden="true" title="Account Settings"></i></a></li>
            <li><a href="#"><i class="fa fa-th-large" aria-hidden="true" title="Memories"></i></a></li>
            <li><a href="#"><i class="fa fa-map-marker" aria-hidden="true"></i></a></li>
            <li><a href="#"><i class="fa fa-plus" aria-hidden="true" title="Add Event"></i></a></li>

          </ul>
        </div>
      </div>
    );
  }
}
