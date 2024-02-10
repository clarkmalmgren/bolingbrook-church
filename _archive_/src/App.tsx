import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { FunctionComponent } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { BCSwitch } from './bc-switch'
import { NavWatcher } from './components/nav-watcher'
import theme from './theme'

export const App: FunctionComponent<{}> =
  () => {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <NavWatcher />
            <BCSwitch />
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    )
  }
