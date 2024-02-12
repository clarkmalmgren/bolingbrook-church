'use client'

import { Roboto } from 'next/font/google'
import LocalFont from 'next/font/local'
import { createTheme } from '@mui/material/styles'
import { orange, teal } from '@mui/material/colors'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const metropolis = LocalFont({
  src: [
    { weight: '400', style: 'normal', path: './metropolis.regular.otf' },
    { weight: '700', style: 'normal', path: './metropolis.bold.otf' },
    { weight: '400', style: 'italic', path: './metropolis.regular-italic.otf' }
  ]
})

export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

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