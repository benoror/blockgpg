import React, { Component } from 'react';

import './UserInfo.css';

class UserInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.user && this.props.user.name(),
      avatarUrl: this.props.user && this.props.user.avatarUrl() || undefined
    }
  }

  render() {
    return (
      <div className="UserInfo">
        <img className="avatar" src={this.state.avatarUrl} />
        <p className="name">{this.state.name}</p>
      </div>
    )
  }
}

export default UserInfo;
