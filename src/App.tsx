import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.scss';

import * as Routes from './pages/index'

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Routes.HomePage} />
      </Router>
    );
  }
}

export default App;
