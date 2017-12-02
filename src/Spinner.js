import React, { Component } from 'react';

import './Spinner.css';

class Spinner extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Spinner"
        style={{display: !this.props.visible ? 'none' : 'block' }}>
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    )
  }
}

export default Spinner;
