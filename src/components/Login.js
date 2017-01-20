import React from "react";
import { authUser } from "../actions/usersActions";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="Login">
        <div class="login-left">
          <form id="Login-Form" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref="user_name" placeholder="Username"/>
            <input type="password" ref="user_pw" placeholder="Password"/>
            <button type="submit" onClick={this.handleSubmit.bind(this)}>Login</button>
            {<p><em>Just use un:Daniel and pw:hescool1 for now ;) </em></p>}
          </form>
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

  handleSubmit(e) {
    const { user_name, user_pw } = this.refs;

    e.preventDefault();
    this.props.dispatch(authUser({
      username: user_name.value,
      password: user_pw.value
    }));
  }
}
