import React, { Component } from 'react';
import FileItem from './FileItem'

import './FileList.css';

class FileList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: [
        'untitled.asc',
        'b','c'
      ]
    }
  }

  render() {
    const fileItems = this.state.files.map((file) =>
      <FileItem file={file} />
    )
    return (
      <div className="FileList">
        <ul>
          {fileItems}
        </ul>
      </div>
    )
  }
}

export default FileList;
