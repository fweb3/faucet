import { AuthProvider, NetworkProvider, UserProvider } from '../hooks'
import { theme } from '../theme'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NetworkProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </NetworkProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
