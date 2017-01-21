import React from "react";
import _ from "lodash";
import Message from "./Message";
import { createComment } from "../actions/eventsActions";


export default class MessageBoard extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {

  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.comments !== nextProps.comments || this.state !== nextState) {
      return true;
    }
    else return false;
  }

  render() {

    return (
      <div class="detail-message-board">
        {this.renderAddCommentForm()}
        <ul class="message-board-list">
          {this.renderMessages()}
        </ul>
      </div>
    );
  }

  renderAddCommentForm() {
    return (
      <form class="AddCommentForm" onSubmit={this.handleAddComment.bind(this)}>
        <div class="comment_template">
          <img src={this.props.currentUser.profile_picture} alt="user_profile_picture"/>
          <div class="message_input">
            <p>{this.props.currentUser.username}</p>
            <textarea ref="user_comment" rows="7" cols="60"></textarea>
            <button type="submit" class="addComment">
              Add Comment<i class="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </form>
    );
  }


  renderMessages() {
    if (this.props.comments) {

      return _.map(this.props.comments, (comment, index) => <Message key={index} {...comment} dispatch={this.props.dispatch}/>);
    }
    else {

      return null;
    }
  }

  handleAddComment(e) {
    e.preventDefault();

    let { user_id, profile_picture } = this.props.currentUser;
    let { user_comment } = this.refs;
    let data = {
      event_id : this.props.eventID,
      user_id,
      comment: user_comment.value,
      profile_picture
    };
    this.props.dispatch(createComment(data));
    user_comment.value = "";
  }
}
