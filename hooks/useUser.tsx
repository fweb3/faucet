import { createContext, useContext, useEffect, useState } from 'react'
import { fetcher } from './fetcher'
import { useAuth } from './useAuth'
import { useNetwork } from './useNetwork'

interface IUserContext {
  user: IUser
  fetching: boolean
  setClientInfo: (data: unknown) => void
  clientInfo: unknown
}

const defaultContext = {
  user: null,
  fetching: false,
  clientInfo: null,
  setClientInfo: () => null
}

const UserContext = createContext<IUserContext>(defaultContext)

const UserProvider = ({ children }) => {
  const { account: connectedAccount, isConnected, setError } = useAuth()
  const { networkName } = useNetwork()
  const [fetching, setFetching] = useState<boolean>(false)
  const [user, setUser] = useState<IUser>(null)
  const [clientInfo, setClientInfo] = useState<unknown>(null)

  useEffect(() => {
    ;(async () => {
      if (connectedAccount && networkName !== 'Not Connected') {
        setFetching(true)
        setError('')
        const user = await fetcher('/api/user', {
          method: 'POST',
          body: JSON.stringify({
            network: networkName,
            account: connectedAccount,
            clientInfo
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (user.status !== 'ok') {
          setError(user.message)
          setFetching(false)
          return
        }
        setUser(user)
        setFetching(false)
      }
    })()
  }, [connectedAccount, isConnected, setError, networkName, clientInfo])
  return (
    <UserContext.Provider
      value={{
        user,
        fetching,
        setClientInfo,
        clientInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => useContext(UserContext)

export { useUser, UserProvider }
