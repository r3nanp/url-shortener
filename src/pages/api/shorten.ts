// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { setUrl } from '@/lib/redis'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.body.url

  if (!url) {
    res.statusCode = 404
    res.send(JSON.stringify({ message: 'url does not exist' }))

    return
  }

  const short = await setUrl(url)

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')

  return res.status(200).json({ url, short })
}
