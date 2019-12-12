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
              <Route exact path="/about" component={Routes.AboutPage} />
              <Route exact path="/location" component={Routes.Location} />
              <Route exact path="/connect" component={Routes.Connect} />
              <Route exact path="/friends-and-family" component={Routes.FriendsAndFamily} />
              <Route exact path="/giving" component={Routes.Giving} />
              <Route exact path="/shop-bc" component={Routes.ShopBC} />
              <Route exact path="/newsletter" component={Routes.Newsletter} />
              <Route exact path="/sermons/:id" component={Routes.Sermon} />
              <Route exact path="/sermons" component={Routes.Sermons} />
              <Route exact path="/serve" component={Routes.Serve} />
              <Route exact path="/thank-you" component={Routes.ThankYou} />

              <Route exact path="/admin" component={Routes.AdminPage} />
              <Route exact path="/admin/login" component={Routes.Login} />
              <Route exact path="/admin/sermons" component={Routes.EditSermons} />
              <Route exact path="/admin/sermons/new" component={Routes.NewSermon} />
              <Route exact path="/admin/sermons/:id" component={Routes.EditSermon} />
              <Route component={Routes.NotFound} />
            </Switch>
          </Router>
        </Provider>
      </ThemeProvider>
    );
  }
}
