import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useUser } from '../../hooks'
import VerifiedIcon from '@mui/icons-material/Verified'
import CancelIcon from '@mui/icons-material/Cancel'

const FAUCET_RULES = {
  HAS_USED_FWEB3_FAUCET: ['FWEB3 faucet has not been used', 'Account has not used FWEB3 faucet'],
  HAS_USED_MATIC_FAUCET: ['MATIC faucet has not been used', 'Account has not used MATIC faucet'],
  IS_BLACKLISTED: ['Account has not been black listed', 'Account is not blacklisted'],
  HAS_TOKENS: ['Account does not have FWEB3 tokens', 'Account does not have FWEB3 already'],
  HAS_MATIC: ['Account does not have MATIC', 'Account already has MATIC'],
}

const MOCK_RULES = [
  'HAS_USED_FWEB3_FAUCET',
  // 'HAS_USED_MATIC_FAUCET',
  // 'IS_BLACKLISTED',
  // 'HAS_TOKENS',
  // 'HAS_MATIC',
]

const RuleItem = ({ ruleBroken, desc }) => (
  <ListItem>
    <ListItemIcon>
      {ruleBroken ? (
        <CancelIcon color='error' />
      ) : (
        <VerifiedIcon color='success' />
      )}
    </ListItemIcon>
    <ListItemText primary={ruleBroken ? desc[1] : desc[0]} />
  </ListItem>
)

const FaucetRuleList = () => {
  const { user } = useUser()
  const ruleErrors = user?.notAllowedReasons || []
  return (
    <List dense>
      {Object.entries(FAUCET_RULES).map(([name, desc], i) => (
        <RuleItem key={i} ruleBroken={ruleErrors.includes(name)} desc={desc} />
      ))}
    </List>
  )
}

export { FaucetRuleList }
