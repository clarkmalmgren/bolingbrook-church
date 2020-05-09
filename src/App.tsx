import { ThemeProvider } from '@material-ui/styles'
import { createBrowserHistory } from 'history'
import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { BCSwitch } from './bc-switch'
import Banner from './components/banner'
import Box from './components/box'
import Footer from './components/footer'
import Header from './components/header'
import { NavWatcher } from './components/nav-watcher'
import theme from './theme'

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
              <BCSwitch />
            </Box>
            <Footer />
          </Router>
        </Provider>
      </ThemeProvider>
    )

  }

export default App
