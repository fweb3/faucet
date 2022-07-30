import { AuthProvider, NetworkProvider, PrismaProvider } from '../hooks'
import { Layout } from '../components/Layout'
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
          <PrismaProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PrismaProvider>
        </NetworkProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
