import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const urlSchema = z.object({
  url: z
    .string({
      required_error: 'The url must be specified'
    })
    .url({
      message: 'This url is invalid'
    })
})

export const resolver = zodResolver(urlSchema)
