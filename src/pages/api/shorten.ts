// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  url: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = req.body.url

  console.log(url)

  res.status(200).json({ url })
}
