import React, { Component } from 'react';

import './UserInfo.css';

class UserInfo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="UserInfo">
        <img className="avatar" src={this.props.user && this.props.user.image[0].contentUrl} />
        <p className="name">{this.props.user && this.props.user.name}</p>
      </div>
    )
  }
}

export default UserInfo;
