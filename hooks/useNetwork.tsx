declare var window: any

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './useAuth'

export interface INetworkState {
  networkAllowed: boolean
  networkName: string
  isLocalnet: boolean
  chainId: number
}

const defaultNetworkState: INetworkState = {
  networkAllowed: false,
  networkName: 'Not Connected',
  isLocalnet: false,
  chainId: null,
}

const NetworkContext = createContext(defaultNetworkState)

const NETNAMES = {
  maticmum: 'Mumbai',
  matic: 'Polygon',
  local: 'Local',
}

const NetworkProvider = ({ children }: IDefaultProps) => {
  const [networkName, setNetworkName] = useState<string>('')
  const [networkAllowed, setNetworkAllowed] = useState<boolean>(true)
  const [isLocalnet, setIsLocalnet] = useState<boolean>(false)
  const [chainId, setChainId] = useState(null)
  const { provider } = useAuth()

  useEffect(() => {
    if (window?.ethereum) {
      window?.ethereum.on('chainChanged', setChainId)
      return () =>
        window?.ethereum.removeListener('chainChanged', setChainId)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        if (provider) {
          const { chainId, name } = await provider.getNetwork()
          const regularName = NETNAMES[name] ?? name
          setNetworkName(regularName)
          setChainId(chainId)

          if (name === 'maticmum' || name === 'matic' || chainId === 1337) {
            setNetworkAllowed(true)
          } else {
            setNetworkAllowed(false)
          }
          if (chainId === 1337) {
            setIsLocalnet(true)
          }

        }
      } catch (err) {
        console.error(err)
      }
    })()
  }, [chainId, provider])
  return (
    <NetworkContext.Provider
      value={{
        networkAllowed,
        networkName,
        isLocalnet,
        chainId,
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}

const useNetwork = () => useContext(NetworkContext)

export { NetworkProvider, useNetwork }
