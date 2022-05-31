import { NextPage } from 'next'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Check, Copy } from 'phosphor-react'
import Head from 'next/head'

import { api } from '@/lib/axios'
import { Button, Input } from '@/components'
import { resolver } from '@/handlers/url'
import { ShortData } from '@/types/ShortData'
import { IFormValues } from '@/types/Form'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

const Home: NextPage = () => {
  const [_, copy] = useCopyToClipboard()
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<IFormValues>({
    resolver
  })

  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)

  const handleOnCopy = async () => {
    if (!shortUrl) return

    const result = await copy(shortUrl)
    setIsCopied(result)
  }

  const handleSend: SubmitHandler<IFormValues> = async ({ url }) => {
    const { data: response } = await api.post<ShortData>('/shorten', {
      url
    })

    const formattedUrl = `${document.location.protocol}//${document.location.host}/${response.short}`

    setShortUrl(formattedUrl)
    setIsCopied(false)
  }

  const onSubmit = handleSubmit(handleSend)

  return (
    <div className="h-screen overflow-hidden w-full flex bg-gray-100 dark:bg-slate-800 items-center justify-center">
      <Head>
        <title>URL Shortener</title>
      </Head>

      <main className="flex items-center justify-center px-6">
        <section className="h-full w-full">
          <div className="my-4">
            <h1 className="text-4xl dark:text-white font-light my-2">
              Keep it brief.
            </h1>
            <p className="text-2xl dark:text-gray-50 font-normal">
              A <span className="font-bold">easier</span> way to{' '}
              <span className="font-bold">share links</span>
            </p>
          </div>

          <form onSubmit={onSubmit}>
            <div className="flex items-center justify-center">
              <Input
                {...register('url')}
                type="url"
                name="url"
                error={errors?.url}
                onFocus={() => clearErrors()}
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
                <div className="flex items-center text-center w-full">
                  <a className="text-blue-400" href={shortUrl}>
                    {shortUrl}
                  </a>

                  <Button
                    className="ml-4"
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
