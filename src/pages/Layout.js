import React from 'react';
import Header from '../components/Header';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div class="site-wrapper">
        <Header/>
           {this.props.children}
      </div>

    );
  }
}
