import { createContext, useContext, useEffect, useState } from 'react'
import { fetcher } from './fetcher'
import { useAuth } from './useAuth'
import { useNetwork } from './useNetwork'

interface IUserContext {
  user: IUser
  fetching: boolean
  fetchUserData: (account: string) => Promise<IUser>
}

const defaultContext = {
  user: null,
  fetching: false,
  fetchUserData: () => null,
}

const UserContext = createContext<IUserContext>(defaultContext)

const UserProvider = ({ children }) => {
  const { account: connectedAccount, isConnected, setError } = useAuth()
  const { networkName } = useNetwork()
  const [fetching, setFetching] = useState<boolean>(false)
  const [user, setUser] = useState<IUser>(null)

  const fetchUserData = async (account: string): Promise<IUser> => {

    if (account) {
      const data = await fetcher('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          network: networkName,
          account
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (connectedAccount && networkName !== 'Not Connected') {
          setFetching(true)
          setError('')
          const user = await fetcher('/api/user', {
            method: 'POST',
            body: JSON.stringify({
              network: networkName,
              account: connectedAccount,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
          setUser(user)
          setFetching(false)
        }
      } catch (err) {
        console.error(err)
        setError(err.message)
        setFetching(false)
      }
    })()
  }, [connectedAccount, isConnected, setError, networkName])
  return (
    <UserContext.Provider
      value={{
        user,
        fetching,
        fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => useContext(UserContext)

export { useUser, UserProvider }
