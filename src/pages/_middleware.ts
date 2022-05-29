import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from '@/lib/redis'

export default async function middleware(request: NextRequest) {
  const [_, path] = request.nextUrl.pathname.split('/')

  const pathNotAllowed = ['favicon.ico', 'api', '']

  if (pathNotAllowed.includes(path)) return

  const url = await getUrl(path)

  if (url) {
    return NextResponse.redirect(url)
  }
}
