declare var window: any

type Nullable<T> = T | null | undefined
interface IDefaultProps {
  children: JSX.Element
  sx?: object
}
interface IMap {
  [key: string]: string
}
interface IFweb3ContractAddresses {
  fweb3AdminNft?: string
  fweb3DiamondNft?: string
  fweb3Erc20Faucet?: string
  fweb3EthFaucet?: string
  fweb3Faucet?: string
  fweb3Game?: string
  fweb3Poll?: string
  fweb3Token?: string
  fweb3Trophy?: string
}

interface IGameTaskState {
  hasUsedFweb3Faucet?: boolean
  hasUsedMaticFaucet?: boolean
  hasSentTokens?: boolean
  hasMintedDiamondNFT?: boolean
  hasBurnedTokens?: boolean
  hasSwappedTokens?: boolean
  hasVotedInPoll?: boolean
  hasDeployedContract?: boolean
  hasWonGame?: boolean
  trophyId?: string
}
