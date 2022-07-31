import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import { useAuth } from '../hooks'

interface IErrorAlertProps {
  error: string
  setError: (message: string) => void
}

export const ErrorAlert = (): JSX.Element => {
  const {error, setError} = useAuth()
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={!!error}>
        <Alert
          severity='error'
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setError('')
              }}
            >
              <CloseIcon fontSize='medium' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Collapse>
    </Box>
  )
}
