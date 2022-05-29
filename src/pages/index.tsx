import { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useCallback, useState } from 'react'

import { api } from '@/lib/axios'
import { ShortData } from '@/types/ShortData'

const Home: NextPage = () => {
  const [value, setValue] = useState('')
  const [shortUrl, setShortUrl] = useState<string | null>(null)

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    const { data } = await api.post<ShortData>('/shorten', {
      url: value
    })

    const formattedUrl = `${document.location.protocol}//${document.location.host}/${data.short}`

    setShortUrl(formattedUrl)
  }, [])

  return (
    <div className="h-screen w-full flex bg-gray-100 items-center justify-center">
      <Head>
        <title>URL Shortener</title>
      </Head>

      <main className="flex items-center justify-center px-6">
        <section className="h-full w-full">
          <div className="my-4">
            <h1 className="text-4xl font-light my-2">Keep it brief.</h1>
            <p className="text-2xl font-normal">
              A <span className="font-bold">easier</span> way to{' '}
              <span className="font-bold">share links</span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center w-full">
              <input
                value={value}
                placeholder="https://mylongurl.com"
                className="rounded-md px-1 w-full py-2 bg-white shadow-lg"
                onChange={event => setValue(event.target.value)}
              />

              <button
                type="submit"
                disabled={value === ''}
                className="ml-2 rounded-md flex items-center bg-blue-400 py-2 px-6 cursor-pointer
                tracking-wider
                hover:bg-blue-500
                transition-colors
                shadow-lg
                disabled:bg-gray-400
                text-white font-bold"
              >
                Shorten!
              </button>
            </div>

            {shortUrl ? (
              <div>
                <a href={shortUrl}>{shortUrl}</a>
              </div>
            ) : null}
          </form>
        </section>
      </main>
    </div>
  )
}

export default Home
