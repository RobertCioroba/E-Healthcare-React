import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Medicine } from './components/Medicine/Medicine';
import { Report } from './components/Report/Report';
import { Product } from './components/Shop/Product';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/report' component={Report} />
        <Route path='/medicine' component={Medicine} />
        <Route path='/product' component={Product} />
      </Layout>
    );
  }
}
