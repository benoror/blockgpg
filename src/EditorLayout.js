import React, { Component } from 'react';
import Spinner from './Spinner';
import FileList from './FileList';
import {Editor, EditorState, ContentState} from 'draft-js';
import debounce from 'lodash/debounce';

import './EditorLayout.css';

const blockstack = require('blockstack');

class EditorLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
      isLoading: true
    }

    this.onChange = this.onChange.bind(this)
    this.saveContent = debounce((content) => {
      this.saveFile(content.getPlainText())
    }, 1000)
  }

  componentDidMount() {
    if(this.props.isSignedIn) {
      this.loadFile()
    }
  }

  loadFile() {
    blockstack.getFile('/untitled.asc').then((file) => {
      const content = ContentState.createFromText(file)
      this.setState({
        editorState: EditorState.createWithContent(content),
        isLoading: false
      })
    }).catch((e) => {
      console.log('Exception: ', e)
    })
  }

  onChange(editorState) {
    const currentContent = this.state.editorState.getCurrentContent()
    const newContent = editorState.getCurrentContent()

    this.setState({editorState})

    if (currentContent !== newContent) {
      // Content has changed
      this.saveContent(newContent)
    }
  }

  saveFile(text, options = {}) {
    this.setState({ isLoading: true })
    return blockstack.putFile('/untitled.asc', text, options).then(() => {
      this.setState({ isLoading: false })
      console.log('Saved!')
    }).catch((e) => {
      console.log('Exception: ', e)
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
              <FileList />
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
