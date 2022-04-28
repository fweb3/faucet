import { Provider } from './interfaces'
import { ethers } from 'ethers'

const { GAS_LIMIT = 200000000000, GAS_MULTIPLIER = 0.2 } = process.env

export const getGasPrices = async (
  provider: Provider
): Promise<number[]> => {
  try {
    const gasRes = await fetch('https://gasstation-mainnet.matic.network/v2')
    if (!gasRes.ok) {
      throw new Error('try provider estimate')
    }
    const {
      fast: { maxPriorityFee: gasEstimateGwei },
    } = await gasRes.json()

    if (!gasEstimateGwei) {
      throw new Error('try provider estimate')
    }
    const gasEstimateWei: number = ethers.utils.parseUnits(
      gasEstimateGwei.toFixed(5).toString(),
      'gwei'
    ).toNumber()
    return _createPriceArray(gasEstimateWei)
  } catch (err: any) {
    const { gasPrice } = await provider.getFeeData()
    const prices = _createPriceArray(gasPrice?.toNumber() || 0)
    return prices ?? [parseInt(GAS_LIMIT.toString())]
  }
}

const _createPriceArray = (gasEstimate: number): number[] => {
  const prices: number[] = []
  Array(4)
    .fill(gasEstimate)
    .reduce((acc, cur) => {
      if (!acc) {
        const increase = _increaseFeeByPercent(cur)
        prices.push(increase)
        return acc + increase
      }
       const increase = _increaseFeeByPercent(acc)
       prices.push(increase)
      return increase
    }, 0)
  return prices
}

const _increaseFeeByPercent = (amt: number) => {
  const percent = parseFloat(GAS_MULTIPLIER.toString())
  return amt * percent + amt
}
