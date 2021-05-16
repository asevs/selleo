import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Navbar, Reservations, Users } from './components';
import { routes } from './routes';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path={routes.reservations} component={Reservations} />
          <Route exact path={routes.users} component={Users} />
        </Switch>
      </BrowserRouter>
    );
  }
}
