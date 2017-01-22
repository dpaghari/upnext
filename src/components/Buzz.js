import React from 'react';
import { Link } from "react-router";
export default class Buzz extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    // this.props.store.dispatch(fetchBuzzNotifications());
  }

  render() {
    const { users, events, dispatch } = this.props;
    // const { buzzMgs } = this.props;
    let pathToUser = "/profiles/1";

    return (
      <section class="buzz">
          <i class="fa fa-bullhorn"></i>
          <ul>
            <li class="">
              <Link to={pathToUser} >
                <figure><img src="../../img/dan.jpg" alt="Profile Picture"/></figure>
                <label>2 min</label>
                <h5>this will be my buzz up next updates. because I make plans. I do.</h5>
              </Link>
            </li>
            <li class="">
              <Link to={pathToUser} >
                <figure><img src="../../img/dan.jpg" alt="Profile Picture"/></figure>
                <label>yesterday</label>
                <h5>Kelsey added pictures to Coachella</h5>
                <figure><img src="../../img/dan.jpg" alt="Profile Picture"/></figure>

              </Link>
            </li>
            <li class="">
              <Link to={pathToUser} >
                <figure><img src="../../img/dan.jpg" alt="Profile Picture"/></figure>
                <label>Jan 1</label>
                <h5>Dan responded YES to Waffle Game Night</h5>
              </Link>
            </li>
            <li class="">
              <Link to={pathToUser} >
                <figure><img src="../../img/dan.jpg" alt="Profile Picture"/></figure>
                <label>Jan 1</label>
                <h5>Dan responded YES to Waffle Game Night</h5>
              </Link>
            </li>
          </ul>
      </section>
    );
  }

}
