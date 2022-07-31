// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchOrCreateUserData } from '../../prisma/service'
import { handleError } from '../../prisma/service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { network, account } = req.body
    const data = await fetchOrCreateUserData(account)
    const gameState = await _fetchTaskState(network, account)
    return res.status(200).json({
      ...data,
      ...gameState
    })
  } catch (err: any) {
    console.error(err.message)
    res.status(500).json(handleError(err.message))
  }
}

async function _fetchTaskState(network: string, account: string) {
  const url = `${process.env.FWEB3_API}/game?network=${network}&account=${account}`
  const token = process.env.FWEB3_API_TOKEN
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await fetch(url, opts)
  const data = await response.json()
  return data
}
