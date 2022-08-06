import { Container, Typography } from '@mui/material'
import { TwitterField } from './TwitterField'
import Box from '@mui/material/Box'
import { useUser } from '../../hooks'

const VerificationScreen = () => {
  const { twitterResponse } = useUser()
  return (
    <Container>
      <Box
        sx={{
          margin: '2rem',
        }}
      >
        <Typography variant='h4'>Request Tokens</Typography>
        <TwitterField />
      </Box>
      <Box>
        <pre>{JSON.stringify(twitterResponse, null, 2)}</pre>
      </Box>
    </Container>
  )
}

export { VerificationScreen }
