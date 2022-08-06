import { ConnectCard } from '../components/ConnectCard'
import { Container } from '@mui/material'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'
import { useUser } from '../hooks'
import { VerificationScreen } from '../components/Verification/VerificationScreen'
import type { NextPage } from 'next'

interface IClientInfoProps {
  [key: string]: unknown
}

const Home: NextPage = ({ clientInfo }: IClientInfoProps) => {
  const { isConnected } = useAuth()
  const { setClientInfo } = useUser()

  useEffect(() => {
    setClientInfo(clientInfo)
  }, [setClientInfo, clientInfo])

  return (
    <Container>
      {isConnected ? <VerificationScreen /> : <ConnectCard />}
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
          req?.headers['x-forwarded-for'].split(',')[0],
      },
    },
  }
}

export default Home
