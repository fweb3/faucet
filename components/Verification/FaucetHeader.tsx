import { Container, Typography } from '@mui/material'

const FaucetHeader = () => (
  <Container
    sx={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem'
    }}
  >
    <Typography variant='h3'>Faucet Verification</Typography>
  </Container>
)

export { FaucetHeader }
