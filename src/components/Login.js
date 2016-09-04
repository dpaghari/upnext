import React from "react";
import { authUser } from "../actions/usersActions";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="Login">
        <form id="Login-Form" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="user_name" placeholder="Username"/>
          <input type="password" ref="user_pw" placeholder="Password"/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    const { user_name, user_pw } = this.refs;

    // e.preventDefault();
    this.props.dispatch(authUser({
      username: user_name.value,
      password: user_pw.value
    }));
    console.log("submitted");
  }
}
