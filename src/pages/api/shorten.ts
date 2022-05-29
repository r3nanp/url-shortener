// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { setUrl } from '@/lib/redis'
import { ShortData } from '@/types/ShortData'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShortData>
) {
  const url = req.body.url
  const short = await setUrl(url)

  res.status(200).json({ url, short })
}
