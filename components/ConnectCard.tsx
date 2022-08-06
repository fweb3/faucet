import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useAuth } from '../hooks'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'

const ConnectButton = () => {
  const { connecting, authenticate } = useAuth()
  return (
    <LoadingButton
      variant='outlined'
      color='success'
      size='large'
      onClick={() => authenticate()}
      loading={connecting}
      loadingIndicator={<CircularProgress color='warning' />}
      startIcon={<ElectricalServicesIcon style={{ fontSize: '2rem' }} />}
    >
      Connect Wallet
    </LoadingButton>
  )
}

export const ConnectCard = () => {
  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '3rem',
        }}
      >
        <Typography variant='h4' sx={{ marginRight: '2rem' }} color='secondary'>
          FWEB3 Faucet
        </Typography>
        <ConnectButton />
      </Box>
    </Container>
  )
}
