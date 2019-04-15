import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router'
import { Provider } from 'react-redux'
// import { Store } from 'redux'
import './App.scss';

import createBrowserHistory from "history/createBrowserHistory";
const history = createBrowserHistory()

import * as Routes from './pages/index'

interface AppProps {
  store: any
}

export default class App extends Component<AppProps> {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Routes.HomePage} />
            <Route path="/about" component={Routes.AboutPage} />
            <Route path="/locations" component={Routes.Locations} />
            <Route path="/connect" component={Routes.Connect} />
            <Route path="/sermons" component={Routes.Sermons} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
