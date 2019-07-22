import { createMuiTheme, Theme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
import cyan from '@material-ui/core/colors/cyan'
import common from '@material-ui/core/colors/common'
import { CSSProperties } from '@material-ui/styles/withStyles'

function headerMargin(base: number): CSSProperties {
 return { marginBlockStart: `${base}rem`, marginBlockEnd: `${base/2}rem` }
} 

export default
  createMuiTheme({
    palette: {
      primary: cyan,
      secondary: {
        main: orange[500],
        light: orange[200],
        dark: orange[900],
        contrastText: common.white
      }
    },
    typography: {
      fontFamily: `'Comfortaa', cursive`,
      useNextVariants: true,

      h1: { fontSize: '2.5rem' },
      h2: { fontSize: '2.0rem' },
      h3: { fontSize: '1.5rem' },
      h4: { fontSize: '1.3rem' },
      h5: { fontSize: '1.2rem' },
      h6: { fontSize: '1.1rem' },
    },
    overrides: {
      MuiButton: {
        root: {
          fontSize: '18px',
          fontFamily: `'Roboto Condensed',sans-serif`
        }
      },
      MuiTypography: {
        root: { fontFamily: `'Comfortaa', cursive` },
        body2: { margin: '12px 0' },

        h1: headerMargin(1.3),
        h2: headerMargin(1.2),
        h3: headerMargin(1.1),
        h4: headerMargin(1.0),
        h5: headerMargin(0.9),
        h6: headerMargin(0.8)
      },
      MuiCardHeader: {
        root: {
          margin: '16px',
          padding: 'inherit'
        },
        title: {
          marginBlockStart: 0,
          marginBlockEnd: 0,
        },
        subheader: {
          marginBlockStart: 0,
          marginBlockEnd: 0,
        }
      },
      MuiCardContent: {
        root: {
          margin: '16px',
          padding: 'inherit',

          '&:last-child': {
            marginBottom: '24px',
            paddingBottom: 'inherit'
          }
        },
      }
    }
  })
  