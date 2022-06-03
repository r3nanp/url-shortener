import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextSeo } from 'next-seo'
import seo from '@/next-seo.config'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo {...seo} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
