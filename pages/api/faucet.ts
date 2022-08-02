import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = `${process.env.FWEB3_API}/faucet`
    const token = process.env.FWEB3_API_TOKEN
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(req.body)
    }
    const response = await fetch(url, opts)
    const data = await response.json()
    res.status(200).json(data)
  } catch (err: any) {
    console.log({ err })
    res.status(500).json(err)
  }
}
