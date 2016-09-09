import React from 'react';

import Header from "../components/Header";
import { fetchUsers } from "../actions/usersActions";

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // console.log(this.props);
    this.props.store.dispatch(fetchUsers());
  }

  // shouldComponentUpdate(nextProps) {
  //   console.log("nextProps", nextProps);
  //   return this.props.store.users !== nextProps.store.users;
  // }

  render() {
    const { users, dispatch, currentPage } = this.props.store;
    const { userId } = this.props.params;
    return (
      <div class="ProfileView">
        <Header currentPage={currentPage} dispatch={dispatch} />
        <div class="userInfo">
          <h1>User Name</h1>
          {this.renderProfilePicture()}
          <strong><p>Bio</p></strong>
          <p class="profiles-prof-bio">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <strong><p>Rank</p></strong>
          <p class="profiles-prof-rank">Greenhorn</p>
        </div>
        <div class="publicEvents">
          <strong><p>Public Events</p></strong>
          <ul class="profile-prof-events">
            <li>Go to Yosemite</li>
          </ul>
        </div>
      </div>

    );
  }
  // TO-DO: Fix
  renderProfilePicture() {

    const { users } = this.props.store;
    const userId = this.props.params.userId;
    //console.log(users.users, userId);
    // if(users.users[userId].profile_picture){
      return <img class="profiles-prof-picture" src="" alt="Profile Picture"/>;
    // }
    // else {
    //   return <img class="profiles-prof-picture" src="" alt="Profile Picture"/>;
    // }
  }

}
