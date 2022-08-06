import { LoadingButton } from "@mui/lab"
import { TextField, InputAdornment, Box } from "@mui/material"
import { useUser } from "../../hooks"
import TwitterIcon from '@mui/icons-material/Twitter'
import { useState } from "react"
import { LoadingBackdrop } from "./LoadingBackdrop"

const TwitterField = () => {
  const [twitterHandle, setTwitterHandle] = useState('')
  const { userError, submitTwitterHandle, fetching } = useUser()

  const handleSubmit = async () => {
    await submitTwitterHandle(twitterHandle)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: '2rem',
      }}
    >
      <LoadingBackdrop isLoading={fetching} />
      <TextField
        sx={{
          width: '100%',
        }}
        autoFocus={true}
        label='Your twitter handle'
        variant='outlined'
        required={true}
        disabled={fetching}
        error={!!userError}
        helperText={userError}
        onChange={({ target }) => setTwitterHandle(target.value)}
        value={twitterHandle}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <TwitterIcon />
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        variant='outlined'
        size='large'
        loading={fetching}
        onClick={handleSubmit}
        // color='secondary'
        sx={{
          marginLeft: '1rem',
        }}
      >
        Request
      </LoadingButton>
    </Box>
  )
}

export { TwitterField }
