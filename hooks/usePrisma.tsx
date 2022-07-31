import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import type { IUser } from '../prisma/prisma.d'

interface IPrismaContext {
  user: IUser
  fetching: boolean
  fetchUserData: (account: string) => Promise<IUser>
}

const defaultContext = {
  user: {
    account: '',
    verified: false,
    sentFweb3: false,
    sentMatic: false,
    isAdmin: false,
    email: '',
    twitter: '',
    discord: '',
    active: false,
    updatedAt: null,
    createdAt: null,
  },
  fetching: false,
  fetchUserData: () => null,
}

const PrismaContext = createContext<IPrismaContext>(defaultContext)

const PrismaProvider = ({ children }) => {
  const { account: connectedAccount, isConnected, setError } = useAuth()
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
      return data
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (connectedAccount) {
          setFetching(true)
          setError('')
          const user = await fetchUserData(connectedAccount)
          console.log({ user })
          setUser(user)
          setFetching(false)
        }
      } catch (err) {
        console.error(err)
        setError(err.message)
        setFetching(false)
      }
    })()
  }, [connectedAccount, isConnected, setError])
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
