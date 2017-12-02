import React, { Component } from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';

import './EditorLayout.css';

const blockstack = require('blockstack');

class EditorLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSignedIn: props.isSignedIn,
      editorState: EditorState.createEmpty()
    }

    if(props.isSignedIn) {
      this.loadFile()
    }

    this.onChange = this.onChange.bind(this)
  }

  loadFile() {
    blockstack.getFile('/untitled.asc').then((file) => {
      const content = ContentState.createFromText(file)
      this.setState({
        editorState: EditorState.createWithContent(content)
      })
    })
  }

  onChange(editorState) {
    const content = editorState.getCurrentContent().getPlainText()
    this.setState({editorState})
    blockstack.putFile('/untitled.asc', content).then(() => {
      console.log('Saved!')
    })
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
