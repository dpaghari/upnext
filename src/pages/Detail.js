import React from 'react';

export default class Detail extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }
  render() {
    return (
      <div class="DetailView">
        <div class="detail-event-info">
        <h1>Detail View</h1>
        <img src="" alt="PLACEHOLDER IMAGE"/>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div class="detail-message-board">
          <ul class="message-board-list">
            <li class="message-board-msg">
              <img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg" placeholder="USER PROFILE PICTURE"/>
              <p>User Name</p>
              <p>User Comment</p>
            </li>
            <li class="message-board-msg">
              <img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg" placeholder="USER PROFILE PICTURE"/>
              <p>User Name</p>
              <p>User Comment</p>
            </li>
            <li class="message-board-msg">
              <img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg" placeholder="USER PROFILE PICTURE"/>
              <p>User Name</p>
              <p>User Comment</p>
            </li>
            <li class="message-board-msg">
              <img src="https://www.presentationpro.com/images/product/medium/slide/PPP_IFlat_LT3_Flat_Avatar_Placeholder_01_Circle.jpg" placeholder="USER PROFILE PICTURE"/>
              <p>User Name</p>
              <p>User Comment</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}
