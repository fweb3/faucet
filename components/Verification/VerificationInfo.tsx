import { ListItem, ListItemText, List } from '@mui/material'
const FaucetVerificationInfo = () => {
  return (
    <List dense>
      <ListItem>
        <ListItemText primary='In order to use the faucet you need to verify you are human.' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Click verify to enter your twitter handle.' />
      </ListItem>
      <ListItem>
        <ListItemText primary='Tweet the code to receive both FWEB3 and MATIC (required to play)' />
      </ListItem>
    </List>
  )
}

export { FaucetVerificationInfo }
