import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { IUser } from '../services/user.d'
import { fetcher } from './fetcher'
import { useAuth } from './useAuth'
import { useNetwork } from './useNetwork'
import { MOCK_USER } from './__mocks__/user.fixture'

interface IUserContext {
  user: IUser
  fetching: boolean
  setClientInfo: (data: unknown) => void
  clientInfo: unknown
  submitTwitterHandle: (handle: string) => void
  verificationCode: string
  setUserError: (message: string) => void
  userError: string
  verificationTweetUrl: string
  setVerificationTweetUrl: (url: string) => void
  twitterResponse: any
}

const defaultContext = {
  user: null,
  fetching: false,
  clientInfo: null,
  setClientInfo: () => null,
  submitTwitterHandle: () => null,
  verificationCode: '',
  setUserError: () => null,
  userError: '',
  verificationTweetUrl: '',
  setVerificationTweetUrl: () => null,
  twitterResponse: null
}

const UserContext = createContext<IUserContext>(defaultContext)

const UserProvider = ({ children }) => {
  const { account: connectedAccount } = useAuth()
  const { networkName } = useNetwork()
  const [fetching, setFetching] = useState<boolean>(false)
  const [user, setUser] = useState<IUser>(null)
  const [clientInfo, setClientInfo] = useState<unknown>(null)
  const [verificationCode, setVerificationCode] = useState<string>('')
  const [userError, setUserError] = useState<string>('')
  const [verificationTweetUrl, setVerificationTweetUrl] = useState<string>('')
  const [twitterResponse, setTwitterResponse] = useState(null)
  const submitTwitterHandle = async (handle: string) => {
    try {
      setFetching(true)
      const data = await fetcher('/api/twitter', {
        body: JSON.stringify({
          twitterHandle: handle,
          account: connectedAccount,
          network: networkName.toLowerCase()
        })
      })
      setTwitterResponse(data)
      setFetching(false)
    } catch (err) {
      console.error(err)
      setUserError('something went wrong')
    }
    setUserError('')
    setFetching(true)
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (connectedAccount && networkName) {
          setFetching(true)
          setUserError('')
          // const user = await fetcher('/api/user', {
          //   method: 'POST',
          //   body: JSON.stringify({
          //     network: networkName.toLowerCase(),
          //     account: connectedAccount,
          //     clientInfo,
          //   }),
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // })
          const user = MOCK_USER
          if (user.status !== 'ok' || !user) {
            // setUserError(user?.message)
            setFetching(false)
            console.debug('[-] Error fetching connected user info from API')
            return
          }
          console.debug(`[+] user connected: ${user.account?.substring(0, 15)}`)
          // console.debug(JSON.stringify(user))
          setUser(user)
          setFetching(false)
        }
      } catch (err) {
        console.error(err)
        setUserError('something went wrong')
      }
    })()
  }, [connectedAccount, clientInfo, networkName])

  return (
    <UserContext.Provider
      value={{
        user,
        fetching,
        setClientInfo,
        clientInfo,
        submitTwitterHandle,
        verificationCode,
        setUserError,
        userError,
        verificationTweetUrl,
        setVerificationTweetUrl,
        twitterResponse,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => useContext(UserContext)

export { useUser, UserProvider }
