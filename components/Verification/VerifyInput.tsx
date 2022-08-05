import { LoadingButton } from "@mui/lab"
import { TextField, InputAdornment, Container } from "@mui/material"
import { useUser } from "../../hooks"
import TwitterIcon from '@mui/icons-material/Twitter'
import { useState } from "react"

const VerifyInput = ({ setOpenModal }) => {
  const [twitterName, setTwitterName] = useState('')
  const { fetching, userError, submitTwitterHandle } = useUser()

  const handleInputChange = (e) => {
    setTwitterName(e.target.value)
  }

  const handleSubmit = async () => {
    await submitTwitterHandle(twitterName)
  }

  return (
    <Container>
      <TextField
        autoFocus={true}
        label='Enter Twitter Handle'
        variant='outlined'
        required={true}
        disabled={fetching}
        error={!!userError}
        helperText={userError}
        onChange={handleInputChange}
        sx={{
          minWidth: '75%',
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <TwitterIcon />
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        variant='contained'
        size='large'
        loading={fetching}
        onClick={handleSubmit}
        sx={{
          marginLeft: '1rem',
          padding: '1rem 1.7rem',
          width: '100%',
        }}
      >
        Verify
      </LoadingButton>
    </Container>
  )
}

export { VerifyInput }
