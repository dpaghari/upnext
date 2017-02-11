import React from 'react';
import Header from '../components/Header';
import { fetchEvents, fetchEventComments, fetchEventInfo } from "../actions/eventsActions";
import { fetchUsers, getUserEventInvites } from "../actions/usersActions";
import MessageBoard from "../components/MessageBoard";
import Sidebar from "../components/Sidebar";
import { getDateString } from "../Util";
import EventHost from "../components/EventHost";
import InviteEntry from "../components/InviteEntry";

import axios from "axios";
import { Link } from "react-router";
import _ from "lodash";


export default class Invites extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.init();
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  shouldComponentUpdate(nextProps, nextState) {
      if(this.props !== nextProps || this.state !== nextState) {
        return true;
      }
      else return false;
  }

  init() {
    this.fetchInvites();
    this.fetchUsers();
  }

  fetchInvites() {
    let { users } = this.props.store;
    let { current_user } = users;
    this.props.store.dispatch(getUserEventInvites(current_user.user_id));
  }

  fetchUsers() {
    this.props.store.dispatch(fetchUsers());
  }

  render() {
    let { users, appState, dispatch } = this.props.store;
    return (
      <div id="InviteView">
        <Sidebar users={users} appState={appState} dispatch={dispatch} />
        <div class="invites-wrapper">
          <ul class="invites">
            {this.renderInvites()}
          </ul>
        </div>
      </div>
    )
  }

  renderInvites() {
    let { users, dispatch } = this.props.store;
    let { invitesInfo } = users;
    return _.map(invitesInfo, (event_invite, index) => <InviteEntry key={index} {...event_invite} dispatch={dispatch}/>);
  }

}
