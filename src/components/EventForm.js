import React from "react";
import { createEvent, sendInvites } from "../actions/eventsActions";
import { hideEventForm } from "../actions/appStateActions";
const GoogleMapsLoader = require('google-maps'); // only for common js environments
GoogleMapsLoader.KEY = 'AIzaSyALT683365k3JbNnmRDLUNY-PfFEyJDKiM';
GoogleMapsLoader.LIBRARIES = ['places'];

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError : false,
      errorMsg : "",
      addedFriends : []
    };
  }


  componentDidMount() {
    GoogleMapsLoader.load(function(google) {
    new google.maps.places.Autocomplete(this.refs.eventLocation);
    }.bind(this));
  }

  render() {
    var headline = "What's Happening?";
    return (
      <div id="EventForm">
      <strong>{headline}</strong>
      {this.renderError()}
      <a class="closeEventForm" href="" onClick={this.handleHideEventForm.bind(this)}><i class="fa fa-close"></i></a>
      <form onSubmit={this.addEvent.bind(this)}>
        <div class="eventMainInfo">
          <fieldset>
          <input name="eventName" ref="eventName" type="text" placeholder="My New Event"/>
          <input name="eventLocation" ref="eventLocation" type="text" placeholder="San Francisco, CA"/>
          <input name="eventDate" ref="eventDate" type="date"/>
          </fieldset>
          <img src="" class="eventImgPreview" alt="Your event image"/>
        </div>
        <div class="eventDescription">
          <fieldset>
          <input onBlur={this.handleImgUpload.bind(this)} name="eventImg" ref="eventImg" placeholder="Event Image URL" type="text"/>
          <textarea name="eventDetails" ref="eventDetails" rows="4" placeholder="Event Description"/>
            <div class="event-radios">
              <label for="eventType">Private
                <input name="eventType" ref="eventType" type="radio" value="1"/>
              </label>
              <label for="eventType">Public
                <input name="eventType" ref="eventType" type="radio" value="0" defaultChecked="true"/>
              </label>
            </div>
          </fieldset>
        </div>
      </form>
        <div class="addedFriends">
          {this.renderAddedFriends()}
          {this.renderFriendInvites()}
        </div>
        <button class="addEvent" onClick={this.addEvent.bind(this)}>Add Event</button>

      </div>
    );
  }


  renderFriendInvites() {
    return (
    <form onSubmit={this.handleAddFriend.bind(this)}>
      <input list="friends" name="eventInvites" ref="eventInvites" type="text" placeholder="Who to invite?" autoComplete="off"/>
      <datalist id="friends">
        {this.renderOptions()}
      </datalist>
      <button type="submit">Add to Guests</button>
      <hr/>
    </form>
    );
  }

  renderAddedFriends() {
    let { addedFriends } = this.state;
    if(addedFriends.length > 0) {
      return addedFriends.map((el, index) => {
        return (
          <a key={index} href="#" class="addedFriend" data-uid={el.id}>
            <img src={el.profile_picture}/><span>{el.username}</span>
          </a>
        );
      });
    }
  }



  handleAddFriend(e) {
    e.preventDefault();
    let { eventInvites } = this.refs;
    let { users } = this.props.users;

    let match = users.find((el) => {
      return el.username === eventInvites.value
    });
    if(match){
      this.state.addedFriends.push(match);
      this.setState({
        addedFriends: this.state.addedFriends
      });
      eventInvites.value = "";
    }

  }


  renderOptions() {
    let { users } = this.props.users;
    return users.map((user, index) => <option data-uid={user.user_id} class="friendOption" key={index} value={user.username}></option> );
  }

  renderError() {
    if(this.state.showError)
      return <span class="errorMsg">{this.state.errorMsg}</span>;
    else {
      return null;
    }
  }

  handleImgUpload(e) {
    document.querySelector(".eventImgPreview").setAttribute("src", e.target.value);
  }

  addEvent(e) {
    e.preventDefault();
    const { eventName, eventDate, eventLocation, eventDetails, eventImg, eventType } = this.refs;

    if(eventName.value === "") {

      var errorMsg = "Please provide a name for your awesome event.";
      this.setState({ showError: true , errorMsg });

      return false;
    }
    if(eventDetails.value === "") {
      var errorMsg = "Please provide a description for your super cool event.";
      this.setState({ showError: true , errorMsg });
      return false;
    }

    this.setState({ showError: false, errorMsg : "" });
    let eventTypeVal = document.querySelector("input[name=eventType]").value;


    let { addedFriends } = this.state;
    let friendstoInvite = addedFriends.map((el) => {
      console.log(el, el.user_id);
      return el.user_id;
    });
    console.log(friendstoInvite);

    let host = this.props.users.current_user.user_id;

    let newEvent = {
      host,
      name: eventName.value,
      event_date: eventDate.value,
      location: eventLocation.value,
      details: eventDetails.value,
      imgURL: eventImg.value,
      event_type: eventTypeVal,
      friends: JSON.stringify(friendstoInvite)
    };

    this.props.dispatch(createEvent(newEvent));
    eventName.value = eventDate.value = eventLocation.value = eventDetails.value = eventImg.value = "";
    this.props.dispatch(hideEventForm());
  }


  validateInput(input) {
    var maxLength = 24;
    var errors = [];
    var result = {
      errors,
      valid : true
    };

    if(input === ""){
      errors.push("empty");
      result.valid = false;
    }
    if(input.indexOf(" ") > -1) {
      errors.push("spaces");
      result.valid = false;
    }

    if(input.length > maxLength) {
      errors.push("maxchars");
      result.valid = false;
    }

    return result;
  }


  handleHideEventForm(e) {
    e.preventDefault();
    this.props.dispatch(hideEventForm());

  }

}
