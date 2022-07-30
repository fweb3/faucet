import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './useAuth'

interface IUser {
  account: string
  twitter?: string
  discord?: string
  userToken?: string
  active: boolean
  updatedAt?: Date
  createdAt?: Date
}

interface IPrismaContext {
  user: IUser
  fetching: boolean
  fetchUserData: (account: string) => Promise<IUser>
}

const defaultContext = {
  user: {
    account: '',
    twitter: '',
    discord: '',
    userToken: '',
    active: false,
    updatedAt: null,
    createdAt: null,
  },
  fetching: false,
  fetchUserData: () => null,
}

const PrismaContext = createContext<IPrismaContext>(defaultContext)

const PrismaProvider = ({ children }) => {
  const { account: connectedAccount, isConnected } = useAuth()
  const [fetching, setFetching] = useState<boolean>(false)
  const [user, setUser] = useState<IUser>()

  const fetchUserData = async (account: string): Promise<IUser> => {
    if (account) {
      const res = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          account,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      console.log('DAT', data)
      return data
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        setFetching(true)
        const user = await fetchUserData(connectedAccount)
        // console.log({ user })
        setUser(user)
        setFetching(false)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [connectedAccount, isConnected])
  return (
    <PrismaContext.Provider
      value={{
        user,
        fetching,
        fetchUserData,
      }}
    >
      {children}
    </PrismaContext.Provider>
  )
}

const usePrisma = () => useContext(PrismaContext)

export { usePrisma, PrismaProvider }
