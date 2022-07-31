export interface IUser {
  account: string
  verified: boolean
  email?: string
  twitter?: string
  discord?: string
  sentFweb3: boolean
  sentMatic: boolean
  active: boolean
  isAdmin: boolean
  updatedAt: Date
  createdAt: Date
}
