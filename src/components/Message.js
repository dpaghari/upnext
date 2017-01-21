import React from "react";
// const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import { Link } from "react-router";
import { changePage } from "../actions/appStateActions";


export default class Message extends React.Component {
  constructor(props) {
    super(props)

  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props !== nextProps || this.state !== nextState) {
      return true;
    }
    else return false;
  }


  render () {

    let { comment_id, comment, profile_picture, profile_url, username } = this.props;
    if(comment_id && comment){
      return (
        <li class="message-board-msg">
          <Link to={`/profiles/${profile_url}`}>
            <img src={profile_picture} alt={profile_url}/>
          </Link>
          <div class="user-comment">
            <p class="comment_user">{username}</p>
            <p class="message">{comment}</p>
          </div>
        </li>
      );
    }
    else {
      return null;
    }
  }


}
