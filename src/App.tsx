import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory()

import theme from './theme'
import * as Routes from './pages/index'

interface AppProps {
  store: any
}

export default class App extends Component<AppProps> {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={this.props.store}>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={Routes.HomePage} />
              <Route path="/about" component={Routes.AboutPage} />
              <Route path="/location" component={Routes.Location} />
              <Route path="/connect" component={Routes.Connect} />
              <Route path="/friends-and-family" component={Routes.FriendsAndFamily} />
              <Route path="/giving" component={Routes.Giving} />
              <Route path="/newsletter" component={Routes.Newsletter} />
              <Route path="/sermons/:id" component={Routes.Sermon} />
              <Route path="/sermons" exact component={Routes.Sermons} />
              <Route path="/serve" exact component={Routes.Serve} />
              <Route path="/thank-you" exact component={Routes.ThankYou} />
              <Route component={Routes.NotFound} />
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}
