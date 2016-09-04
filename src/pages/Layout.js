import React from 'react';

export default class Layout extends React.Component {

  render() {

    return (
      <div class="site-wrapper">
        {this.props.children}
      </div>

    );
  }

}
