import { ConnectButton } from '../shared/ConnectButton'
import { NetworkInformation } from './NetworkInformation'
import { AppBar, Toolbar } from '@mui/material'
import { ErrorAlert } from '../ErrorAlert'
import { useNetwork } from '../../hooks'
import { useEffect, useState } from 'react'

export const NavBar = () => {
  const { networkAllowed } = useNetwork()
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (networkAllowed) {
      setError('')
    } else {
      setError('Connected to wrong network')
    }
  }, [networkAllowed])
  return (
    <AppBar
      position='static'
      sx={{
        background: 'black',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          justifyContent: 'space-between',
          m: '1em',
        }}
      >
        <ConnectButton />
        <NetworkInformation />
      </Toolbar>
    </AppBar>
  )
}
