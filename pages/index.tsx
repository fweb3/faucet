import { Container } from '@mui/material'
// import { FaucetForm } from '../components/Faucet/FaucetForm'
import { SplashScreen } from '../components/SplashScreen'
import { useAuth } from '../hooks/useAuth'
import type { NextPage } from 'next'
import { VerificationForm } from '../components/Verification/VerificationForm'
import { useUser } from '../hooks'
import { useEffect } from 'react'

interface IClientInfoProps {
  [key: string]: unknown
}

const Home: NextPage = ({ clientInfo }: IClientInfoProps) => {
  const { fetchingUser } = useUser()
  const { isConnected } = useAuth()
  const { setClientInfo } = useUser()

  useEffect(() => {
    setClientInfo(clientInfo)
  }, [setClientInfo, clientInfo])

  return (
    <Container>
      {isConnected && !fetchingUser ? <VerificationForm /> : <SplashScreen />}
    </Container>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return {
    props: {
      clientInfo: {
        ...req.headers,
        userAgent,
        ip:
          req?.connection?.remoteAddress ||
          req.headers['x-forwarded-for'].split(',')[0],
      },
    },
  }
}

export default Home
