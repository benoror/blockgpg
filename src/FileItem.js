import React, { Component } from 'react';

import './FileItem.css';

class FileItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className="FileItem">
        {this.props.file}
      </li>
    )
  }
}

export default FileItem;
