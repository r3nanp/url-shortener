import { Redis } from '@upstash/redis'
import { getShort } from '@/utils/getShort'
import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from '@/constants'

const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
})

export async function setUrl(url: string) {
  const short = getShort()

  await redis.set(`short/${short}`, url)

  return short
}
