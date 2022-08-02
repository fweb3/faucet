import { ALLOWED_NETWORKS, NETWORKS } from '../../constants'
import { Container, useTheme } from '@mui/material'
import { Fweb3Button } from './Fweb3'
import { green, red } from '@mui/material/colors'
import { INetworkState, useAuth, useNetwork } from '../../hooks'
import { LargeText } from '../shared/LargeText'
import { Layout } from '../Layout'
import { LoadingOverlay } from '../LoadingOverlay'
import { MaticButton } from './Matic'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Link from 'next/link'
import Paper from '@mui/material/Paper'
import ReCAPTCHA from 'react-google-recaptcha'
import Typography from '@mui/material/Typography'

export const createScannerUrl = (
  chainId: number,
  transaction: string
): string => {
  const currentNetwork = ALLOWED_NETWORKS[chainId]
  if (currentNetwork === NETWORKS.MUMBAI) {
    return `https://mumbai.polygonscan.com/tx/${transaction}`
  } else if (currentNetwork === NETWORKS.POLYGON) {
    return `https://polygonscan.com/tx/${transaction}`
  }
  return ''
}

export const FaucetForm = () => {
  const [startCapatcha, setStartCapatcha] = useState<boolean>(false)
  const [transaction, setTransaction] = useState<string>('')
  const [faucetType, setFaucetType] = useState<string>('')
  const [scannerUrl, setScannerUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { chainId }: INetworkState = useNetwork()
  const [error, setError] = useState<string>('')
  const { account } = useAuth()
  const theme = useTheme()

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    buttonContainer: {},
    form: {
      padding: theme.spacing(3),
      margin: theme.spacing(5),
    },
    display: 'flex',
    margin: theme.spacing(2),
    alignItems: 'center',
  }

  const handleCapatcha = async (token: string | null) => {
    if (token) {
      setStartCapatcha(false)
      await handleFaucetSubmit()
      return
    }
    setStartCapatcha(false)
    setFaucetType('')
    setError('Failed capatcha')
  }

  const triggerFaucetRequest = (type: string) => {
    setStartCapatcha(true)
    setFaucetType(type)
  }

  const handleFaucetSubmit = async (): Promise<void> => {
    try {
      setError('')
      setLoading(true)
      const faucetResponse = await fetch('/api/faucet', {
        method: 'POST',
        body: JSON.stringify({
          type: faucetType,
          network: ALLOWED_NETWORKS[chainId],
          account,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log({ faucetResponse })
      const jsonResopnse = await faucetResponse.json()
      const { transaction_hash, status, message } = jsonResopnse
      console.log({ jsonResopnse })
      if (status !== 'success') {
        setError(message)
      } else if (!transaction_hash) {
        setError(
          'No tx receipt was received. Please check your wallet for confirmation'
        )
      } else {
        setTransaction(transaction_hash)
        setScannerUrl(createScannerUrl(chainId, transaction_hash))
      }
      setLoading(false)
    } catch (e: any) {
      console.error({ e })
      setError(e?.message)
      setLoading(false)
    }
  }

  return (
    <Layout>
      <>
        <LoadingOverlay
          isLoading={loading}
          loadingMessage='Sending Transaction...'
        />
        <Box sx={styles.container}>
          {startCapatcha ? (
            <Container
              sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ReCAPTCHA
                sitekey='6Ld13o4fAAAAAMByXu-GE5J34kq_hoUDZRd9tMFy'
                onChange={handleCapatcha}
              />
            </Container>
          ) : (
            <Paper elevation={24} sx={styles.form}>
              <LargeText text='Fweb3 Faucet (beta)' />
              {transaction ? (
                <Typography variant='h4'>Success!</Typography>
              ) : (
                <Box
                  m={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  {error ? null : (
                    <>
                      <Fweb3Button handleSubmit={triggerFaucetRequest} />
                      <MaticButton handleSubmit={triggerFaucetRequest} />
                    </>
                  )}
                </Box>
              )}
              {transaction && (
                <>
                  <Typography>Transaction Hash</Typography>
                  <Typography>{transaction}</Typography>
                  {scannerUrl && (
                    <Link href={scannerUrl} passHref>
                      <Typography variant='body1' sx={{ color: green[500] }}>
                        View on polygonscan
                      </Typography>
                    </Link>
                  )}
                </>
              )}
              {error && (
                <Typography variant='body1' sx={{ color: red[300] }}>
                  {error}
                </Typography>
              )}
            </Paper>
          )}
        </Box>
      </>
    </Layout>
  )
}
