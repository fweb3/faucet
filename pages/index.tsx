import { Container } from '@mui/material'
// import { FaucetForm } from '../components/Faucet/FaucetForm'
import { SplashScreen } from '../components/SplashScreen'
import { useAuth } from '../hooks/useAuth'
import type { NextPage } from 'next'
import { VerificationForm } from '../components/Verification/VerificationForm'

const Home: NextPage = (props) => {
  const { isConnected } = useAuth()
  return (
    <Container>{isConnected ? <VerificationForm /> : <SplashScreen />}</Container>
  )
}

Home.getInitialProps = async ({ req }) => {
  const ip = req.headers['x-forwarded-for']
  console.log({ ip })
  return { ip }
}

export default Home
