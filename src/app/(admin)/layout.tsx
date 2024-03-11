import { RequireAuth } from '@/components/RequireAuth'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import type { Metadata } from 'next'
import { FunctionComponent, PropsWithChildren } from 'react'
import { theme } from '../../theme'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Bolingbrook Church Editor',
  description: 'Edit the Website'
}

const RootLayout: FunctionComponent<PropsWithChildren<{}>> =
  ({ children }) => (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AdminHeader />
            <RequireAuth>
              { children }
            </RequireAuth>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )

export default RootLayout
