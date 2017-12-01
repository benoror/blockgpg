import React, { Component } from 'react';
import {Editor, EditorState} from 'draft-js';

import './EditorLayout.css';

class EditorLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSignedIn: props.isSignedIn,
      editorState: EditorState.createEmpty()
    }

    this.onChange = (editorState) => this.setState({editorState})
  }

  render() {
    if(this.state.isSignedIn) {
      return (
        <div className="EditorLayout">
            <main className="content">
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
              />
            </main>
            <nav className="nav">Nav</nav>
        </div>
      )
    } else {
      return ''
    }
  }
}

export default EditorLayout;
