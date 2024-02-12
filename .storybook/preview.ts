import '../src/app/globals.css'
import type { Preview, ReactRenderer } from '@storybook/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { theme } from '../src/theme'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    withThemeFromJSXProvider<ReactRenderer>({
      themes: { default: theme },
      defaultTheme: 'default',
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline
    })
  ]
}

export default preview
