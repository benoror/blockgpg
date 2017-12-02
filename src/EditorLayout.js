import React, { Component } from 'react';
import Spinner from './Spinner';
import {Editor, EditorState, ContentState} from 'draft-js';

import './EditorLayout.css';

const blockstack = require('blockstack');

class EditorLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
      isLoading: true
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
        editorState: EditorState.createWithContent(content),
        isLoading: false
      })
    })
  }

  onChange(editorState) {
    const content = editorState.getCurrentContent().getPlainText()
    this.setState({editorState})
    this.saveContents(content)
  }

  saveContents(content) {
    this.setState({ isLoading: true })
    return blockstack.putFile('/untitled.asc', content).then(() => {
      this.setState({ isLoading: false })
      console.log('Saved!')
    })
  }

  render() {
    this.state.editorState.getCurrentContent().getPlainText()
    if(this.props.isSignedIn) {
      return (
        <div className="EditorLayout">
          <Spinner visible={this.state.isLoading}/>
          <div className="EditorLayoutFlex">
            <main className="content">
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
              />
            </main>
            <nav className="nav">
            </nav>
          </div>
        </div>
      )
    } else {
      return ''
    }
  }
}

export default EditorLayout;
