import { createTheme } from '@mui/material'
import { orange, teal } from '@mui/material/colors'
import { CSSInterpolation } from '@mui/material/styles'

function headerMargin(base: number): CSSInterpolation {
 return { marginBlockStart: `${base}rem`, marginBlockEnd: `${base/2}rem` }
} 

const primaryFontFamily = `'Montserrat', sans-serif`
const accentFontFamily = `'Montserrat', sans-serif`

export default
  createTheme({
    palette: {
      primary: orange,
      secondary: teal
    },
    typography: {
      fontFamily: primaryFontFamily,

      h1: { fontSize: '4.5rem', fontFamily: accentFontFamily },
      h2: { fontSize: '3.0rem', fontFamily: accentFontFamily },
      h3: { fontSize: '2.3rem', fontFamily: accentFontFamily },
      h4: { fontSize: '1.8rem', fontFamily: accentFontFamily },
      h5: { fontSize: '1.4rem', fontFamily: accentFontFamily },
      h6: { fontSize: '1.2rem', fontFamily: accentFontFamily },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '18px',
            fontFamily: accentFontFamily,
            fontWeight: 300
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: { fontFamily: primaryFontFamily },
          body2: { margin: '12px 0', fontSize: '16px' },
  
          h1: headerMargin(1.3),
          h2: headerMargin(1.2),
          h3: headerMargin(1.1),
          h4: headerMargin(1.0),
          h5: headerMargin(0.9),
          h6: headerMargin(0.8)
        },
      },
      MuiCardHeader: {
        styleOverrides: {
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
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            margin: '16px',
            padding: 'inherit',

            '&:last-child': {
              marginBottom: '24px',
              paddingBottom: 'inherit'
            }
          }
        }
      }
    }
  })
  