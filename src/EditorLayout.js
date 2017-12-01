import React, { Component } from 'react';

import './EditorLayout.css';

class EditorLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSignedIn: props.isSignedIn
    }
  }

  render() {
    if(this.state.isSignedIn) {
      return (
        <div class="EditorLayout">
          <div class="body">
            <main class="content">Content</main>
            <nav class="nav">Nav</nav>
          </div>
        </div>
      )
    } else {
      return ''
    }
  }
}

export default EditorLayout;
