'use client'

import LocalFont from 'next/font/local'
import { createTheme } from '@mui/material/styles'
import { orange, teal } from '@mui/material/colors'

const metropolis = LocalFont({
  src: [
    { weight: '400', style: 'normal', path: './fonts/metropolis.regular.otf' },
    { weight: '700', style: 'normal', path: './fonts/metropolis.bold.otf' },
    { weight: '400', style: 'italic', path: './fonts/metropolis.regular-italic.otf' }
  ]
})

const socicon = LocalFont({
  src: [
    { path: './fonts/Socicon.eot' },
    { path: './fonts/Socicon.woff2' },
    { path: './fonts/Socicon.ttf' },
    { path: './fonts/Socicon.woff' }
  ]
})

export const fonts = { metropolis, socicon }

export const theme = createTheme({
  palette: {
    primary: orange,
    secondary: teal
  },
  typography: {
    fontFamily: metropolis.style.fontFamily,
    fontSize: 18,
    h1: { fontSize: 43, fontWeight: '700', textTransform: 'uppercase' },
    h2: { fontSize: 35, fontWeight: '700', textTransform: 'uppercase' },
    h3: { fontSize: 32, fontWeight: '700' },
    h4: { fontSize: 32 },
    h5: { fontSize: 25 },
    h6: { fontSize: 18, fontWeight: '700' },
  },
})
