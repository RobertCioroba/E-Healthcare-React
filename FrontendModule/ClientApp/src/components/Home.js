import React, { Component } from 'react';
import './Home.css'

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <h1 className="adminTitle">ABC Healthcare</h1>
        </div>
    );
  }
}
