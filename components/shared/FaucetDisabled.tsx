import { Container, Typography } from "@mui/material"

const FaucetDisabled = () => {
  return (
    <Container>
      <Typography variant='h3'>Faucet disabled because of bots.</Typography>
      <Typography variant='h4'>
        We will be giving the game tokens out manually. Please ask in the
        discord.
      </Typography>
    </Container>
  )
}


export { FaucetDisabled }
