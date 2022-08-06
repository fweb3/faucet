import { createContext, useContext, useEffect, useState } from 'react'
import { fetcher } from './fetcher'
import { useAuth } from './useAuth'
import { useNetwork } from './useNetwork'

interface IUserContext {
  user: IUser
  fetchingUser: boolean
  setClientInfo: (data: unknown) => void
  clientInfo: unknown
  submitTwitterHandle: (handle: string) => void
  verificationCode: string
  setUserError: (message: string) => void
  userError: string
  verificationTweetUrl: string
  setVerificationTweetUrl: (url: string) => void
}

const defaultContext = {
  user: null,
  fetchingUser: false,
  clientInfo: null,
  setClientInfo: () => null,
  submitTwitterHandle: () => null,
  verificationCode: '',
  setUserError: () => null,
  userError: '',
  verificationTweetUrl: '',
  setVerificationTweetUrl: () => null,
}

const UserContext = createContext<IUserContext>(defaultContext)

const UserProvider = ({ children }) => {
  const { account: connectedAccount, isConnected } = useAuth()
  const { networkName } = useNetwork()
  const [fetchingUser, setFetchingUser] = useState<boolean>(false)
  const [user, setUser] = useState<IUser>(null)
  const [clientInfo, setClientInfo] = useState<unknown>(null)
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [userError, setUserError] = useState<string>('')
  const [verificationTweetUrl, setVerificationTweetUrl] = useState<string>('')

  const submitTwitterHandle = async (handle: string) => {
    // const data = await fetcher('/api/twitter', {
    //   body: JSON.stringify({})
    // })
    setVerificationCode(user.verifyHash)
  }

  useEffect(() => {
    ;(async () => {
      if (connectedAccount && networkName !== 'Not Connected') {
        setFetchingUser(true)
        setUserError('')
        const user = await fetcher('/api/user', {
          method: 'POST',
          body: JSON.stringify({
            network: networkName.toLowerCase(),
            account: connectedAccount,
            clientInfo,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (user.status !== 'ok' || !user) {
          setUserError(user?.message.substring(0, 40) || '[-] Something went wrong')
          setFetchingUser(false)
          console.info('[-] Error fetching connected user info from API')
          return
        }
        console.info(`[+] user connected: ${user.account?.substring(0, 15)}`)
        console.debug({ user })
        setUser(user)
        setFetchingUser(false)
      }
    })()
  }, [connectedAccount, isConnected, setUserError, networkName, clientInfo])
  return (
    <UserContext.Provider
      value={{
        user,
        fetchingUser,
        setClientInfo,
        clientInfo,
        submitTwitterHandle,
        verificationCode,
        setUserError,
        userError,
        verificationTweetUrl,
        setVerificationTweetUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => useContext(UserContext)

export { useUser, UserProvider }
