export interface IUser {
  id?: string
  ip?: string
  createdAt?: DateTime
  updatedAt?: DateTime
  account?: string
  email?: string
  twitter?: ITwitterData
  discord?: string
  ens?: string
  role: Role
  taskState?: IGameTaskState
  active?: boolean
  ipinfo?: IIpInfo
  clientInfo?: string
  verifyHash?: string
  verifySalt?: string
  notAllowedReasons?: string[]
}

export interface ITwitterData {
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

export interface IIpInfo {
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

export enum Role {
  PLAYER,
  ADMIN,
  ROOT,
}
