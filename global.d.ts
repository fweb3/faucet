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
  hasUsedFweb3Faucet?: string
  hasUsedMaticFaucet?: string
  hasSentTokens?: string
  hasMintedDiamondNFT?: string
  hasBurnedTokens?: string
  hasSwappedTokens?: string
  hasVotedInPoll?: string
  hasDeployedContract?: string
  hasWonGame?: string
  trophyId?: string
}

interface IUser {
    id: string
    ip: string
    createdAt: DateTime
    updatedAt: DateTime
    account: string
    email?: string
    twitter: ITwitterData
    discord?: string
    ens?: string
    role: Role
    taskState: IGameTaskState
    active: boolean
    ipinfo: IIpInfo
    clientInfo?: string
}

interface ITwitterData {
    id: string
    profileImageUrl?: string
    name?: string
    twitterId?: string
    username?: string
    followersCount?: number
    followingCount?: number
    tweetCount?: number
    location?: string
    twitterCreatedAt?: DateTime
}

interface IIpInfo {
    id: string
    ip?: string
    hostname?: string
    country?: string
    city?: string
    region?: string
    loc?: string
    org?: string
    postal?: string
    timezone?: string
    userAgent?: string
}

enum Role {
  PLAYER,
  ADMIN,
  ROOT
}
