import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Grid,
} from '@mui/material'
import { useState } from 'react'
import { useUser } from '../../hooks'
import { FaucetHeader } from './FaucetHeader'
import { FaucetVerificationInfo } from './VerificationInfo'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { FaucetModal } from './FaucetModal'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  height: '100%',
}))

const NewUserInfo = () => {
  const { user } = useUser()
  const [openModal, setOpenModal] = useState<boolean>(false)

  const toggleVerifyFormModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FaucetModal openModal={openModal} setOpenModal={setOpenModal}/>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={8}>
          <Item>
            <FaucetVerificationInfo />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              background: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              color='secondary'
              variant='contained'
              size='large'
              onClick={toggleVerifyFormModal}
              sx={{
                width: '55%',
                padding: '1rem',
              }}
            >
              Verify
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

const LoadingSpinner = () => (
  <Container
    sx={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem',
    }}
  >
    <CircularProgress size={100} color='secondary' />
  </Container>
)

const VerificationForm = () => {
  const { user, fetching } = useUser()
  return (
    <Container
      sx={{
        marginTop: '2.5rem',
      }}
    >
      <FaucetHeader />
      {fetching ? <LoadingSpinner /> : <NewUserInfo />}
    </Container>
  )
}

export { VerificationForm }
