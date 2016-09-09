import React from "react";
import _ from "lodash";
import Message from "./Message"

export default class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="detail-message-board">
        <ul class="message-board-list">
          {this.renderMessages()}
        </ul>
      </div>
    );
  }

  renderMessages() {
    return _.map(this.props.messages, (msg, index) => <Message key={index} {...msg} dispatch={this.props.dispatch}/>);
  }
}
