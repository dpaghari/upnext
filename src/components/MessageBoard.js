import React from "react";
import _ from "lodash";
import Message from "./Message"


export default class MessageBoard extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {

  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props !== nextProps || this.state !== nextState) {
      return true;
    }
    else return false;
  }

  render() {
    // console.log("message board props: ", this.props);
    return (
      <div class="detail-message-board">
        <ul class="message-board-list">
          {this.renderMessages()}
        </ul>
      </div>
    );
  }

  renderMessages() {
    if (this.props.comments) {
      console.log(this.props.comments);
      return _.map(this.props.comments, (comment, index) => <Message key={index} id={comment.id} comment={comment.comment} dispatch={this.props.dispatch}/>);
    }
    else {
      console.log("no");
      return null;
    }
  }
}
