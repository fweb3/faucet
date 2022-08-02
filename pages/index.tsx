import { Container } from '@mui/material'
// import { FaucetForm } from '../components/Faucet/FaucetForm'
import { SplashScreen } from '../components/SplashScreen'
import { useAuth } from '../hooks/useAuth'
import type { NextPage } from 'next'
import { useUser } from '../hooks'
import { VerificationForm } from '../components/Verification/VerificationForm'


const Home: NextPage = () => {
  const { isConnected } = useAuth()
  const { user } = useUser()
  return (
    <Container>{isConnected ? <VerificationForm /> : <SplashScreen />}</Container>
  )
}

export default Home
