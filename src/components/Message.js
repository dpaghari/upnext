import React from "react";
// const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { Link } from "react-router";
import { changePage } from "../actions/appStateActions";


export default class Message extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props);
  }

  render () {
    return (
      <li class="message-board-msg">
        <img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg" placeholder="USER PROFILE PICTURE"/>
        <div class="user-comment">
          <p>{this.props.user}</p>
          <p>{this.props.message}</p>
        </div>
      </li>
    );
  }


}
