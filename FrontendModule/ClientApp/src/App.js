import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Medicine } from './components/Medicine/Medicine';
import { Report } from './components/Report/Report';
import { Product } from './components/Shop/Product';
import { Cart } from './components/Cart/Cart';
import { Profile } from './components/Account/Profile';
import { Order } from './components/Order/Order';
import { Funds } from './components/Account/Funds';
import { Login } from './components/Account/Login';
import { Register } from './components/Account/Register';

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
        <Route path='/cart' component={Cart} />
        <Route path='/profile' component={Profile} />
        <Route path='/order' component={Order} />
        <Route path='/funds' component={Funds} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Layout>
    );
  }
}
