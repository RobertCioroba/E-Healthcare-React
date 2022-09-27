import React, { Component } from 'react';
import './Home.css'

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <h1 className="adminTitle">Admin panel</h1>
        </div>
    );
  }
}
