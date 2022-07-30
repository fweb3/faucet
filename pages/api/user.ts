// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await prisma.user.findUnique({ where: { account: 'foo' }})
    if (data) {
      return res.status(200).json(data)
    }
    return res.status(200).json({})
  } catch (err: any) {
    console.error(err)
    res.status(500).json(err.message)
  }
}
