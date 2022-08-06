declare var window: any

import { createContext, useState, useEffect, useContext } from 'react'
import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'

export interface IAuthState {
  isConnected: boolean
  authenticate: () => void
  deauthenticate: () => void
  account: string
  provider: Web3Provider
  connecting: boolean
  error: string
  isAdmin: boolean
  setError: (val: string) => void
}

const defaultAuthState: IAuthState = {
  isConnected: false,
  authenticate: () => {},
  deauthenticate: () => {},
  account: '',
  provider: null,
  connecting: false,
  error: '',
  isAdmin: false,
  setError: () => {}
}

const AuthContext = createContext(defaultAuthState)

const AuthProvider = ({ children }: IDefaultProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState<string>('')
  const [connecting, setConnecting] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const deauthenticate = () => {
    setAccount('')
    setIsConnected(false)
  }

  const authenticate = async () => {
    try {
      if (window?.ethereum) {
        setError('')
        setConnecting(true)
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          'any'
        )
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()
        const account = await signer?.getAddress()

        setProvider(provider)
        setAccount(account)
        setConnecting(false)
        setIsConnected(true)
      } else {
        alert('You must have metamask to use this service')
      }
    } catch (err) {
      console.error(err)
      setError(err.message)
    }
  }

  const handleAccountsChanged = (accounts) => {
    setAccount(accounts?.[0] || '')
  }

  const handleDisconnect = () => {
    setAccount('')
    setIsConnected(false)
  }

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('disconnect', handleDisconnect)

      return () => {
        window?.ethereum.removeListener('disconnect', handleDisconnect)
        window?.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged
        )
      }
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        if (window?.ethereum && provider) {
          setError('')
          setConnecting(true)
          const signer = await provider.getSigner()
          const account = await signer?.getAddress()
          if (account) {
            setAccount(account)
            setIsConnected(true)
          }
          setConnecting(false)
        }
      } catch (e) {
        console.error(e)
        setError(e.message)
      }
    })()
  }, [provider])

  return (
    <AuthContext.Provider
      value={{
        isConnected,
        authenticate,
        account,
        provider,
        deauthenticate,
        connecting,
        error,
        setError,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
