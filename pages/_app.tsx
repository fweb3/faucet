import { AuthProvider, NetworkProvider, PrismaProvider } from '../hooks'
import { ErrorAlert } from '../components/ErrorAlert'
import { theme } from '../theme'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ErrorAlert />
      <CssBaseline />
      <AuthProvider>
        <NetworkProvider>
          <PrismaProvider>
            <Component {...pageProps} />
          </PrismaProvider>
        </NetworkProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
