import {
  ALLOWED_NETWORKS,
} from '../constants'

import { IAuthState, useAuth } from './useAuth'
import { INetworkState } from './useNetwork'
import { useEffect, useState } from 'react'
import { useNetwork } from './useNetwork'
import { getContractAddress } from '../contracts/addresses'

export interface IPermissionsState {
  isAdmin: boolean
  canUseMaticFaucet: boolean
  canUseFweb3Faucet: boolean
}

export const usePermissions = (): IPermissionsState => {
  const [canUseFweb3Faucet, setCanUseFweb3Faucet] = useState<boolean>(false)
  const [canUseMaticFaucet, setCanUseMaticFaucet] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const { chainId }: INetworkState = useNetwork()
  const { isConnected, account }: IAuthState = useAuth()

  useEffect(() => {
    if (isConnected && ALLOWED_NETWORKS[chainId]) {
      setCanUseFweb3Faucet(true)
      setCanUseMaticFaucet(true)
    }

  }, [chainId, isConnected, account])
  return {
    isAdmin,
    canUseMaticFaucet,
    canUseFweb3Faucet,
  }
}

interface IRequestOptions {
  chain?: string
  address?: string
  token_addresses?: string[]
  token_address?: string
}

const _createBalanceRequestOptions = (
  chainId: string,
  address: string
): IRequestOptions => {
  const networkName = ALLOWED_NETWORKS[chainId]
  const fweb3TokenAddress = getContractAddress(networkName, 'fweb3Token')
  return {
    chain: chainId,
    address,
    token_addresses: [fweb3TokenAddress],
  }
}

const _createNFTRequestOptions = (
  chainId: string,
  address: string
): IRequestOptions => {
  const networkName = ALLOWED_NETWORKS[chainId]
  const adminNftAddress = getContractAddress(networkName, 'fweb3AdminNft')
  return {
    chain: chainId,
    address,
    token_address: adminNftAddress,
  }
}
