import React from 'react';


export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div class="site-wrapper">
           {this.props.children}
      </div>

    );
  }
}
