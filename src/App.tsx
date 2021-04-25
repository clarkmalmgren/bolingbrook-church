import { ThemeProvider } from '@material-ui/styles'
import { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { BCSwitch } from './bc-switch'
import Banner from './components/banner'
import Footer from './components/footer'
import { Header } from './components/header'
import { NavWatcher } from './components/nav-watcher'
import theme from './theme'

interface AppProps {
  store: any
}

const App: FunctionComponent<AppProps> =
  (props) => {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={props.store}>
          <BrowserRouter>
            <NavWatcher />
            <Header />
            <Banner />
            <BCSwitch />
            <Footer />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    )

  }

export default App
