import React from 'react';

import Header from "../components/Header";
import { fetchUsers } from "../actions/usersActions";

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.store.dispatch(fetchUsers());
  }


  render() {
    const { users, dispatch } = this.props.store;
    const currentUserID = users.current_user_id;
    const userId = this.props.params.userId;
    return (
      <div class="ProfileView">
        <Header currentPage={this.props.currentPage} dispatch={this.props.dispatch} />
        <div class="userInfo">
          <h1>Profile View</h1>
          <img class="profiles-prof-picture" src={users.users[currentUserID].profile_picture}/>
          <p class="profiles-prof-bio"></p>
        </div>
        <div class="publicEvents">
          <ul class="profile-prof-events">
          </ul>
        </div>
      </div>

    );
  }

}
