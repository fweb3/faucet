import { fetchOrCreateUser } from '../../services/api.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const payload = await fetchOrCreateUser(req.body)
    return res.status(200).json(payload)
  } catch (err: any) {
    console.error(err.message)
    res.status(500).json({
      status: 'error',
      message: err.message
    })
  }
}
