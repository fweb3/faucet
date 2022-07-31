import { Container } from '@mui/material'
// import { FaucetForm } from '../components/Faucet/FaucetForm'
import { SplashScreen } from '../components/SplashScreen'
import { useAuth } from '../hooks/useAuth'
import type { NextPage } from 'next'
import { usePrisma } from '../hooks'
import { VerificationForm } from '../components/Verification/VerificationForm'


const Home: NextPage = () => {
  const { isConnected } = useAuth()
  const { user } = usePrisma()
  return (
    <Container>{isConnected ? <VerificationForm /> : <SplashScreen />}</Container>
  )
}

export default Home
