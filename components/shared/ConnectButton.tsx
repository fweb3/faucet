import { Button, Typography } from '@mui/material'
import { ErrorAlert } from '../ErrorAlert'
import { IAuthState, useAuth } from '../../hooks'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'

export const ConnectButton = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { isConnected, connecting, error } = useAuth()
  const { authenticate, deauthenticate } = useAuth()

  const styles = {
    connectButton: {
      // padding: '1em'
    }
  }

  const handleConnect = async () => {
    await authenticate()
  }
  const handleDisconnect = () => {
    deauthenticate()
  }
  return (
    <>
      {!isConnected ? (
        <LoadingButton
          variant='contained'
          loading={loading}
          onClick={handleConnect}
          size='large'
          fullWidth
          sx={{
            background: 'red',
            ":hover": {
              background: 'green'
            }
          }}
        >
          <Typography variant='body1'>Connect</Typography>
        </LoadingButton>
      ) : (
        <Button
          sx={styles.connectButton}
          variant='contained'
          size='large'
          onClick={handleDisconnect}
        >
          <Typography>Disconnect</Typography>
        </Button>
      )}
    </>
  )
}
