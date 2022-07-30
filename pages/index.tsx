import { Container } from '@mui/material'
import { FaucetForm } from '../components/Faucet/FaucetForm'
import { SplashScreen } from '../components/SplashScreen'
import { useAuth } from '../hooks/useAuth'
import type { NextPage } from 'next'
import { usePrisma } from '../hooks'


const Home: NextPage = () => {
  const { isConnected } = useAuth()
  const { user } = usePrisma()
  return (
    <Container>{isConnected ? <FaucetForm /> : <SplashScreen />}</Container>
  )
}

export default Home
