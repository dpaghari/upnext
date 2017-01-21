import React from "react";
import { authUser, createUser } from "../actions/usersActions";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistering: false,
      showPWError: false
    };
  }

  render() {
    return (
      <div class="Login">
        <div class="login-left">
          {this.renderLoginForm()}

        </div>
        <div class="login-right">
        <div class="brand">
          <h1>Upnext</h1>
          <i class="fa fa-arrow-circle-up" aria-hidden="true" title="Upnext"></i>
        </div>
        </div>
      </div>
    );
  }


  renderLoginForm() {
    if(!this.state.isRegistering){
      return (
        <form id="Login-Form" onSubmit={this.handleSubmit.bind(this)}>

          <input type="text" ref="user_name" placeholder="Username" autoFocus/>
          <input type="password" ref="user_pw" placeholder="Password"/>
          <button class="loginBtn" type="submit" onClick={this.handleSubmit.bind(this)}>Login</button>
          {<p><em>Just use un:Daniel and pw:hescool1 for now ;) </em></p>}
          <p>Not signed up? Create an account real quick</p>
          <button onClick={this.handleRegisterUser.bind(this)} class="registerBtn">Sign me up!</button>
        </form>
      );
    }
    else {
      return (
        <form id="Login-Form" onSubmit={this.handleSubmit.bind(this)}>
          <label for="user_name">Username:</label>
          <input type="text" ref="user_name" placeholder="Username" autoFocus/>

          <label for="user_pw">Password:</label>
          <input type="password" ref="user_pw" placeholder="Password"/>

          <label for="user_pw_confirm">Confirm Password:</label>
          <input type="password" ref="user_pw_confirm" placeholder="Password"/>
          {this.renderPWError()}

          <label for="user_dob">Birthday:</label>
          <input type="date" ref="user_dob"/>

          <img class="new_user_profile_picture" src="" alt="new_user_profile_picture"/>
          <label for="user_profile_picture">Profile Picture:</label>
          <input onBlur={this.handleImgUpload.bind(this)} type="text" ref="user_profile_picture"/>


          <button class="registerBtn" type="submit" onClick={this.handleSubmit.bind(this)}>Register</button>
        </form>
      )
    }
  }


  renderPWError() {
    if(this.state.showPWError) {
      return <span style={{"color": "#d0202b"}}>Password Mismatch!</span>
    }
    else
      return null;
  }

  handleImgUpload(e) {
    document.querySelector(".new_user_profile_picture").setAttribute("src", e.target.value);
  }

  handleRegisterUser(e) {
    this.setState({
      isRegistering: true
    });
  }

  handleSubmit(e) {

    e.preventDefault();
    if(!this.state.isRegistering){
      const { user_name, user_pw } = this.refs;
      this.props.dispatch(authUser({
        username: user_name.value,
        password: user_pw.value
      }));
    }
    else {
      const { user_name, user_pw, user_pw_confirm, user_dob, user_profile_picture } = this.refs;
      if(user_pw.value === user_pw_confirm.value){
        this.props.dispatch(createUser({
          user_name : user_name.value,
          user_pw: user_pw.value,
          user_dob: user_dob.value,
          user_profile_picture: user_profile_picture.value
        }));
      }
      else {
        this.setState({
          showPWError: true
        });
      }
    }
  }
}
