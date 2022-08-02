import {
  Container,
  Typography,
  TextField,
  FormGroup,
  Button,
  Paper,
} from '@mui/material'
import { useUser } from '../../hooks'

const VerificationForm = () => {
    const { user } = useUser()

  const sending = false
  return (
    <Container
      sx={{
        marginTop: '2rem',
      }}
    >
      <Typography variant='h4'>Generate Verification Tweet</Typography>
      <Paper
        elevation={3}
        sx={{
          marginTop: '2rem',
          padding: '2rem',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TextField
            autoFocus={true}
            label='Twitter Handle'
            variant='filled'
            required={true}
            disabled={sending}
            sx={{
              minWidth: '75%',
              color: 'white'
            }}
          />
          <Button
            variant='contained'
            size='large'
            sx={{
              padding: '1rem 1.7rem',
            }}
          >
            Generate
          </Button>
        </Container>
      </Paper>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Container>
  )
}

export { VerificationForm }
