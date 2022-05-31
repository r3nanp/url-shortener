import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Check, Copy } from 'phosphor-react'

import { api } from '@/lib/axios'
import { Button, Input } from '@/components'
import { resolver } from '@/handlers/url'
import { ShortData } from '@/types/ShortData'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

type UrlType = { url: string }

const Home: NextPage = () => {
  const [_, copy] = useCopyToClipboard()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isDirty, isSubmitting }
  } = useForm({
    resolver
  })

  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const handleOnCopy = async () => {
    if (!shortUrl) return

    const result = await copy(shortUrl)
    setIsCopied(result)
  }

  const handleSend: SubmitHandler<UrlType> = async data => {
    const { data: response } = await api.post<ShortData>('/shorten', {
      url: data
    })

    const formattedUrl = `${document.location.protocol}//${document.location.host}/${response.short}`

    setShortUrl(formattedUrl)
    setIsCopied(false)
  }

  const onSubmit = handleSubmit(({ url }) => {
    handleSend(url)
  })

  useEffect(() => {
    inputRef?.current?.focus()
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

          <form onSubmit={onSubmit}>
            <div className="flex items-center justify-center">
              <Input
                error={errors?.url}
                onFocus={() => clearErrors()}
                {...register('url')}
                ref={inputRef}
                name="url"
              />

              <Button
                className="ml-4"
                type="submit"
                content="Shorten!"
                disabled={!isDirty}
                isLoading={isSubmitting}
              />
            </div>

            {shortUrl ? (
              <section className="mt-6">
                <p>Check it out!</p>

                <div className="flex items-center text-center">
                  <a className="text-blue-400 w-full" href={shortUrl}>
                    {shortUrl}
                  </a>

                  <Button
                    className="ml-2"
                    type="button"
                    content={isCopied ? 'Copied!' : 'Copy'}
                    data-bs-target="tooltip"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Click to copy to clipboard"
                    onClick={handleOnCopy}
                    leftIcon={
                      isCopied ? (
                        <Check
                          className="text-white mr-2"
                          width={20}
                          height={20}
                        />
                      ) : (
                        <Copy
                          className="text-white mr-2"
                          width={20}
                          height={20}
                        />
                      )
                    }
                  />
                </div>
              </section>
            ) : null}
          </form>
        </section>
      </main>
    </div>
  )
}

export default Home
