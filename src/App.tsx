import { ThemeProvider } from '@material-ui/styles'
import { createBrowserHistory } from 'history'
import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router'
import Banner from './components/banner'
import Box from './components/box'
import Footer from './components/footer'
import Header from './components/header'
import { ContentfulPage } from './contentful/page'
import * as Routes from './pages/index'
import theme from './theme'
import { NavWatcher } from './components/nav-watcher'

const history = createBrowserHistory()

interface AppProps {
  store: any
}

const App: FunctionComponent<AppProps> =
  (props) => {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={props.store}>
          <Router history={history}>
            <NavWatcher />
            <Header />
            <Banner />
            <Box variant="main">
              <Switch>
                <Route exact path="/"                     component={() => <ContentfulPage path='/' />} />
                <Route exact path="/about"                component={() => <ContentfulPage path='/about' />} />
                <Route exact path="/location"             component={Routes.Location} />
                <Route exact path="/connect"              component={Routes.Connect} />
                <Route exact path="/friends-and-family"   component={() => <ContentfulPage path='/friends-and-family' />}  />
                <Route exact path="/giving"               component={() => <ContentfulPage path='/giving' />}  />
                <Route exact path="/shop-bc"              component={Routes.ShopBC} />
                <Route exact path="/meet-us"              component={() => <ContentfulPage path='/meet-us' />}  />
                <Route exact path="/newsletter"           component={Routes.Newsletter} />
                <Route exact path="/sermons/:id"          component={Routes.Sermon} />
                <Route exact path="/sermons"              component={Routes.Sermons} />
                <Route exact path="/serve"                component={Routes.Serve} />
                <Route exact path="/thank-you"            component={() => <ContentfulPage path='/thank-you' />}  />
                <Route exact path="/refuel"               component={() => <ContentfulPage path='/refuel' />}  />

                <Route exact path="/admin"                component={Routes.AdminPage} />
                <Route exact path="/admin/login"          component={Routes.Login} />
                <Route exact path="/admin/sermons"        component={Routes.EditSermons} />
                <Route exact path="/admin/sermons/new"    component={Routes.NewSermon} />
                <Route exact path="/admin/sermons/:id"    component={Routes.EditSermon} />
                <Route                                    component={ContentfulPage} />
              </Switch>
              </Box>
            <Footer />
          </Router>
        </Provider>
      </ThemeProvider>
    )

  }

export default App
