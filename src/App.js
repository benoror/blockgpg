import React, { Component } from 'react';

import './App.css';

import UserInfo from './UserInfo';

const blockstack = require('blockstack');

class App extends Component {
  constructor(props) {
    super(props)

    let isSignedIn = this.checkSignedInStatus();

    this.state = {
      isSignedIn,
      person: isSignedIn && this.loadPerson()
    }

    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  checkSignedInStatus() {
    if (blockstack.isUserSignedIn()) {
      // showProfile(profile)
      return true;
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then(function(userData) {
        window.location = window.location.origin
      })
      return false;
    }
  }

  loadPerson() {
    let profile = blockstack.loadUserData().profile

    return new blockstack.Person(profile)
  }

  handleSignIn(event) {
    event.preventDefault();
    blockstack.redirectToSignIn()
  }

  handleSignOut(event) {
    event.preventDefault();
    blockstack.signUserOut(window.location.href)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <UserInfo user={this.state.person} />
          <p style={{display: !this.state.isSignedIn ? 'none' : 'block' }}>
            <button onClick={this.handleSignOut}>
              Sign-out
            </button>
          </p>
        </header>
        <p style={{display: this.state.isSignedIn ? 'none' : 'block' }}>
          <h1 className="App-title">BlockGPG</h1>
          <button onClick={this.handleSignIn}>
            Sign-in with Blockstack
          </button>
        </p>
      </div>
    )
  }
}

export default App;
